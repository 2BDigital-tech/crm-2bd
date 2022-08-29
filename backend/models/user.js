const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
  customerName: { type: String, required: true },
  creationDate: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
