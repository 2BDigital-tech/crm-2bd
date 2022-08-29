const { MongoClient } = require("mongodb");

const connect = async (req, res, next) => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://jordan:quickimmo@cluster0.m7tdv.mongodb.net/?retryWrites=true&w=majority";
  // "mongodb+srv://jordant:test@cluster0.mp1u70r.mongodb.net/?retryWrites=true&w=majority";
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
    .db("quick-immo")
    .collection("quotations")
    .find({})
    .toArray();

  return result;
}

exports.connect = connect;
