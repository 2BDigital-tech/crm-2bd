const { MongoClient } = require("mongodb");
require("dotenv").config();

const connect = async (req, res, next) => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = process.env.MONGODB_NILLAETBEN;
  const client = new MongoClient(uri);

  let response;
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    response = await getQuotationData(client);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(response);
};

async function getQuotationData(client) {
  let docs = [];
  const result = await client
    .db("quick-immo-dev")
    .collection("quotations")
    .find({})
    .toArray();

  return result;
}

exports.connect = connect;
