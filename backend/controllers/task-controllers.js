const HttpError = require("../models/error");
const Task = require("../models/task");
const User = require("../models/user");

const { default: mongoose } = require("mongoose");

const getTasks = async (req, res, next) => {
  const uid = req.params.uid;
  let tasksList;
  try {
    tasksList = await User.findById(uid).populate("tasks"); // find the user by id and get also the tasks of this user, this method returns the user document and the tasks document associated to the user
  } catch (err) {
    const error = new HttpError(
      "Une erreur est survenue, veuillez reessayer",
      404
    );
    return next(error);
  }
  res.status(200).json({ message: "All Tasks", tasks: tasksList.tasks }); //extract the tasks array from "tasksList" and return it
};

const addTask = async (req, res, next) => {
  // const errors = validationResult(req);
  // console.log(errors);
  // if (hasValidationErrors(errors)) {
  //   const error = new HttpError(
  //     "Impossible d'ajouter cette tache, donnee manquante",
  //     401
  //   );
  //   return next(error);
  // }
  const { title, summary, creator } = req.body;

  const createdTask = new Task({
    title,
    summary,
    creator,
  });
  //save the task in the tasks collection
  try {
    await createdTask.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Une erreur est survenue , veuillez reessayer",
      500
    );
    return next(error);
  }
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("creating task failed, please try again", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("creating task failed, please try again", 500);
    return next(error);
  }
  // save the task in the tasks array of the specific user that created the task (the id is saved and with that we can access the object)
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTask.save({ session: sess });
    user.tasks.push(createdTask);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to create task, try again", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Task saved successfully",
    title: title,
    summary: summary,
    creator: creator,
  });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.tid; //tid stands for task id
  let task;
  try {
    task = await Task.findById(taskId).populate("creator");
  } catch (err) {
    const error = new HttpError("Could not find task", 500);
    return next(error);
  }

  if (!task) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await task.remove({ session: sess });
    task.creator.tasks.pull(task);
    await task.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }

  res.status(200).json({ message: "Task deleted successfully" });
};

exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.getTasks = getTasks;
