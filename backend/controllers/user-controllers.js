const HttpError = require("../models/error");
const { validationResult } = require("express-validator");
const mailSender = require("./sendPassword");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Task = require("../models/task");
const Folder = require("../models/folder");
const { ObjectId } = require("mongodb");
const task = require("../models/task");

const hasValidationErrors = (errors) => {
  if (!errors.isEmpty()) {
    return true;
  }
  return false;
};

const userExists = async (email) => {
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      500
    );
    return next(error);
  }
  if (user === null) {
    return false;
  }
  return true;
};

const generatePassword = () => {
  var randomPass = Array(10)
    .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join("");
  return randomPass.toString();
};

const addUser = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (hasValidationErrors(errors)) {
    const error = new HttpError(
      "Impossible d'ajouter l'utilisateur, donnee non valide",
      401
    );
    return next(error);
  }
  const { name, email, role, creationDate, customerName, city } = req.body;
  if (await userExists(email)) {
    const error = new HttpError(
      "Cette adresse e-mail est déjà utilisée par un utilisateur",
      500
    );
    return next(error);
  }
  let password = generatePassword();
  console.log(password);
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    customerName: customerName,
    creationDate,
    city,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Une erreur est survenue , veuillez reessayer",
      500
    );
    return next(error);
  }
  if (createdUser) {
    try {
      await mailSender.sendMail(email, password);
    } catch (err) {
      const error = new HttpError(
        "Erreur, impossible d'envoyer le mot de passe",
        500
      );
      return next(error);
    }
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secretkey_dontshare",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer, 500"
    );
    return next(error);
  }

  res.status(200).json({
    message: "Utilisateur Ajoute",
    email: createdUser.email,
    password: password,
    token: token,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  // if (hasValidationErrors(errors)) {
  //   const error = new HttpError("Identifiants Incorrects", 401);
  //   return next(error);
  // }

  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Utilisateur incorrect", 404);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Impossible d'identifier l'utilisateur", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secretkey_dontshare",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in did not succeed, please retry",
      500
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Impossible de se connecter, indentifiants incorrects",
      401
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Donnees invalides, veuillez reesayer", 401);
    return next(error);
  }

  res.status(200).json({
    message: "User Logged in",
    email: email,
    userName: existingUser.name,
    token: token,
    userId: existingUser.id,
    role: existingUser.role,
    city: existingUser.city,
  });
};

const getUsers = async (req, res, next) => {
  let userList;
  try {
    userList = await User.find({}, "-password"); // get all users without the password field
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      404
    );
    return next(error);
  }
  res.status(200).json({ message: "All Users", users: userList });
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.body;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      500
    );
    return next(error);
    5;
  }

  if (!user) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await Task.deleteMany({ creator: userId }).session(sess);
    await Folder.updateMany({
      $pull: { readers: { userId: ObjectId(userId) } },
    }).session(sess); //in the Folder collection, in each Folder, if the in the "readers" array there is a match with the userID, remove the Object from the Array
    await Folder.deleteMany({ readers: { $size: 0 } }).session(sess); // after removing a reader from the arrau of readers, if one of the documents has an empty array of readers, remove the document
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Utilisateur incorrect", 404);
    return next(error);
  }
  res.status(200).json({ message: "User deleted" });
};

const updateUser = async (req, res, next) => {
  const { name, email, role, customerName, city } = req.body;
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Une erreur est survenu, veuillez reessayer",
      500
    );
    return next(error);
  }

  if (user) {
    user.name = name;
    user.email = email;
    user.role = role;
    user.customerName = customerName;
    user.city = city;
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.login = login;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
