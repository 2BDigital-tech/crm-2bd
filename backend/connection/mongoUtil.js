const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uri = process.env.MONGODB_NILLAETBEN;

var _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
      _db = client.db("quick-immo");
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
