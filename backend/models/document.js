const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  documentId: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, require: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  folderId: { type: String, required: true, ref: "Folder" },
  subFolderIndex: { type: String, required: true },
});

module.exports = mongoose.model("Document", DocumentSchema);
