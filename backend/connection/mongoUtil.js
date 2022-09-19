const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uri = process.env.MONGODB_NILLAETBEN;

var _db;

module.exports = {
  connectToServer: function () {
    const client = new MongoClient(uri);
    _db = client.db("quick-immo");
  },

  getDb: function () {
    return _db;
  },
};
