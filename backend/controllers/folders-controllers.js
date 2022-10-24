const HttpError = require("../models/error");
const Folder = require("../models/folder");
const User = require("../models/user");

const { default: mongoose } = require("mongoose");
const { Http } = require("@mui/icons-material");
const { Fold } = require("tabler-icons-react");

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

const deleteFolder = async (req, res, next) => {
  let { folderId } = req.body;
  let folder, readers, uId;
  try {
    folder = await Folder.findById(folderId);
    readers = folder.readers;
    // console.log(folder);
  } catch (err) {
    const error = new HttpError("Could not find folder", 500);
    return next(error);
  }

  if (!folder) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await folder.remove({ session: sess });
    await User.updateMany({ $pull: { folders: { $eq: folderId } } }).session(
      sess
    );
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }

  res.status(200).json({ message: "Folder deleted successfully" });
};

const editFolder = async (req, res, next) => {
  let { folderId, folderName, readers } = req.body;
  let folder;
  let existingReaders;
  try {
    //if a user was removed from the readers, delete the folderId from its "folder array" and remove the user object from the array of readers in the folder object
    const sess = await mongoose.startSession();
    sess.startTransaction();
    folder = await Folder.findById(folderId).session(sess);
    await folder.updateOne({ name: folderName }).session(sess);
    existingReaders = folder.readers;
    for (var i = 0; i < existingReaders.length; i++) {
      if (!readers.includes(existingReaders[i].userName)) {
        let user = await User.findById(existingReaders[i].userId).session(sess);
        await user
          .updateOne({ $pull: { folders: { $eq: folderId } } })
          .session(sess);
        await folder
          .updateOne({
            $pull: {
              readers: { userName: { $eq: existingReaders[i].userName } },
            },
          })
          .session(sess);
      }
    }
    // if a user was added to the readers
    let dbReaders_usernames = [];
    existingReaders.forEach((element) =>
      dbReaders_usernames.push(element.userName)
    );
    //if a user was added to the readers, add the folderId to its "folder array" and add the user object from the array of readers in the folder object
    for (var i = 0; i < readers.length; i++) {
      if (!dbReaders_usernames.includes(readers[i])) {
        let user = await User.findOne({ name: readers[i] }).session(sess); //find the user associated to the name
        await user.updateOne({ $push: { folders: folder } }).session(sess);
        let userObj = { userName: readers[i], userId: user._id };
        await folder.updateOne({ $push: { readers: userObj } }).session(sess);
      }
    }
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }

  res.status(200).json({ message: "Folder updated successfully" });
};

exports.addFolder = addFolder;
exports.getFolders = getFolders;
exports.deleteFolder = deleteFolder;
exports.editFolder = editFolder;
