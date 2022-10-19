const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
  customerName: { type: String, required: true },
  city: { type: String, required: false },
  creationDate: { type: String, required: true },
  tasks: [{ type: mongoose.Types.ObjectId, required: false, ref: "Task" }],
  folders: [{ type: mongoose.Types.ObjectId, required: false, ref: "Folder" }],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
