const { MongoClient } = require("mongodb");
require("dotenv").config();
const {
  ZIP_METZ,
  ZIP_TOULON,
  ZIP_PARIS,
  NANCY_ZIPCODES,
  ZIP_STRASBOURG,
} = require("../constants/zipcodes");
var mongoUtil = require("../connection/mongoUtil");

const getQuotationData = async (req, res, next) => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const { city, monthNum, year } = req.body;

  try {
    // Connect to the MongoDB cluster
    var db = mongoUtil.getDb();
  } catch (err) {
    console.log(err);
  }
  let result = await db.collection("quotations").find().toArray();
  let booking_data = await db.collection("bookings").find({}).toArray();
  let arr2 = [];
  booking_data.forEach((element) => {
    if (element !== undefined) {
      let info = {
        ...element,
      };
      arr2.push(info.quotationId);
    }
  });
  booking_data = arr2;

  // console.log(result.slice(-50));
  let filter_date = year + "-" + monthNum;
  let filtered_res;
  let resp;
  switch (city) {
    case "Metz":
      filtered_res = result.filter((item) =>
        ZIP_METZ.includes(item.quotation.address.split(",").pop().trim())
      );
      resp = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Nancy":
      filtered_res = result.filter((item) =>
        NANCY_ZIPCODES.includes(item.quotation.address.split(",").pop().trim())
      );
      resp = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Strasbourg":
      filtered_res = result.filter((item) =>
        ZIP_STRASBOURG.includes(item.quotation.address.split(",").pop().trim())
      );
      resp = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Toulon":
      filtered_res = result.filter((item) =>
        ZIP_TOULON.includes(item.quotation.address.split(",").pop().trim())
      );
      resp = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Paris":
      filtered_res = result.filter((item) =>
        ZIP_PARIS.includes(item.quotation.address.split(",").pop().trim())
      );
      resp = filtered_res.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    default:
      resp = result;
  }

  res.status(200).json({ quotation_data: resp, book_data: booking_data });
};

const getLeads = async (req, res, next) => {
  let docs = [];
  let db;
  try {
    // Connect to the MongoDB cluster
    db = mongoUtil.getDb();
  } catch (err) {
    console.log(err);
  }
  const result = await db.collection("quotations").find({}).toArray();

  res.status(200).json({ result });
};

exports.getQuotationData = getQuotationData;
exports.getLeads = getLeads;
