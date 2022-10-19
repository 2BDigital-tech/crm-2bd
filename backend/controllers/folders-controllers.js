const HttpError = require("../models/error");
const Folder = require("../models/folder");
const User = require("../models/user");

const { default: mongoose } = require("mongoose");
const { Http } = require("@mui/icons-material");

const addFolder = async (req, res, next) => {
  const { folderName, readers } = req.body;

  let UsersObjectsID = [];
  let user;
  let userId;
  let userName;
  for (var i = 0; i < readers.length; i++) {
    user = await User.find({ name: readers[i] });
    userId = user[0]._id;
    userName = user[0].name;
    UsersObjectsID.push({ userName: userName, userId: userId });
  }

  const createdFolder = new Folder({
    name: folderName,
    readers: UsersObjectsID,
  });

  try {
    await createdFolder.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Une erreur est survenue , veuillez reessayer",
      500
    );
    return next(error);
  }
  for (var i = 0; i < readers.length; i++) {
    try {
      user = await User.find({ name: readers[i] });
    } catch (err) {
      const error = new HttpError(
        "creating folder failed, please try again",
        500
      );
      return next(error);
    }
    if (!user) {
      const error = new HttpError(
        "creating folder failed, user not found, please try again",
        500
      );
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdFolder.save({ session: sess });
      user[0].folders.push(createdFolder);
      await user[0].save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      console.log(err);
      const error = new HttpError("Failed to create folder, try again", 500);
      return next(error);
    }
  }

  res.status(200).json({
    message: "Folder saved successfully",
    name: folderName,
    readers: UsersObjectsID,
  });
};

const getFolders = async (req, res, next) => {
  let foldersList;
  try {
    foldersList = await Folder.find({});
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez ressayer",
      404
    );
    return next(error);
  }
  res.status(200).json({ message: "Folders", foldersList: foldersList });
};

exports.addFolder = addFolder;
exports.getFolders = getFolders;
