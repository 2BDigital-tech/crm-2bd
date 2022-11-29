const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: { type: String, required: true },
  readers: { type: Array, required: true, ref: "User" },
  documents: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Document" },
  ],
});

module.exports = mongoose.model("Folder", folderSchema);
