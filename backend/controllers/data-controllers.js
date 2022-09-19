const { MongoClient } = require("mongodb");
require("dotenv").config();
const {
  ZIP_METZ,
  ZIP_TOULON,
  ZIP_PARIS,
  NANCY_ZIPCODES,
  ZIP_STRASBOURG,
} = require("../constants/zipcodes");

const connect = async (req, res, next) => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = process.env.MONGODB_NILLAETBEN;
  const client = new MongoClient(uri);
  const { city, monthNum, year } = req.body;

  let response;
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    response = await getQuotationData(client, city, monthNum, year);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(response);
};

async function getQuotationData(client, city, month, year) {
  let docs = [];
  let result = await client
    .db("quick-immo")
    .collection("quotations")
    .find()
    .toArray();

  // console.log(result.slice(-50));
  let filter_date = year + "-" + month;
  let filtered_res;
  let res;
  switch (city) {
    case "Metz":
      filtered_res = result.filter((item) =>
        ZIP_METZ.includes(item.quotation.address.split(",").pop().trim())
      );
      res = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Nancy":
      filtered_res = result.filter((item) =>
        NANCY_ZIPCODES.includes(item.quotation.address.split(",").pop().trim())
      );
      res = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Strasbourg":
      filtered_res = result.filter((item) =>
        ZIP_STRASBOURG.includes(item.quotation.address.split(",").pop().trim())
      );
      res = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Toulon":
      filtered_res = result.filter((item) =>
        ZIP_TOULON.includes(item.quotation.address.split(",").pop().trim())
      );
      res = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Paris":
      filtered_res = result.filter((item) =>
        ZIP_PARIS.includes(item.quotation.address.split(",").pop().trim())
      );
      res = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
  }

  return res;
}

exports.connect = connect;
