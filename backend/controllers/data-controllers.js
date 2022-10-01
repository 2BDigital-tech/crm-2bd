const { MongoClient } = require("mongodb");
require("dotenv").config();
const { zipMap } = require("../constants/zipcodes");
var mongoUtil = require("../connection/mongoUtil");

const filterDate = (items, date) => {
  let ans = items.filter(
    (item) => item._createdAt.toISOString().substring(0, 7) === date
  );
  return ans;
};

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
  let filterExpertCity;
  let filterParams;
  switch (city) {
    case "Metz":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      filterParams = filterExpertCity.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Nancy":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      filterParams = filterExpertCity.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Strasbourg":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      filterParams = filterExpertCity.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Toulon":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      filterParams = filterExpertCity.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    case "Paris":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      filterParams = filterExpertCity.filter(
        (item) => item._createdAt.toISOString().substring(0, 7) === filter_date
      );
      break;
    default:
      filterParams = result;
  }

  res
    .status(200)
    .json({ quotation_data: filterParams, book_data: booking_data });
};

const getLeads = async (req, res, next) => {
  let db;
  try {
    // Connect to the MongoDB cluster
    db = mongoUtil.getDb();
  } catch (err) {
    console.log(err);
  }
  const result = await db.collection("quotations").find({}).toArray();

  res.status(200).json({ quotation_data: result });
};

const getLeadsExperts = async (req, res, next) => {
  let db;
  const { expert_city, filter } = req.body;
  let filterParsed;
  if (filter !== undefined) {
    if (Object.keys(filter).length != 0) {
      filterParsed = JSON.parse(filter);
    }
  }

  try {
    // Connect to the MongoDB cluster
    db = mongoUtil.getDb();
  } catch (err) {
    console.log(err);
  }
  let result = await db.collection("quotations").find({}).toArray();

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

  let filter_date;
  if (filterParsed) {
    filter_date = filterParsed.year + "-" + filterParsed.monthNum;
  }

  let filterExpertCity; // loading the leads based only on the expert city
  let filterParams; // if the expert is filtering on a specifing month and year, this array filters the data according to the parameters of the filters passed in the request
  switch (expert_city) {
    case "Metz":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(expert_city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      if (Object.keys(filter).length !== 0) {
        filterParams = filterDate(filterExpertCity, filter_date);
      }
      break;
    case "Nancy":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(expert_city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      if (Object.keys(filter).length !== 0) {
        filterParams = filterDate(filterExpertCity, filter_date);
      }
      break;
    case "Strasbourg":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(expert_city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      if (Object.keys(filter).length !== 0) {
        filterParams = filterDate(filterExpertCity, filter_date);
      }
      break;
    case "Toulon":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(expert_city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      if (filter !== undefined) {
        if (Object.keys(filter).length !== 0) {
          filterParams = filterDate(filterExpertCity, filter_date);
        }
      }
      break;
    case "Paris":
      filterExpertCity = result.filter((item) =>
        zipMap
          .get(expert_city)
          .includes(item.quotation.address.split(",").pop().trim())
      );
      if (filter !== undefined) {
        if (Object.keys(filter).length !== 0) {
          filterParams = filterDate(filterExpertCity, filter_date);
        }
      }
      break;
  }
  if (filter !== undefined) {
    if (Object.keys(filter).length !== 0) {
      result = filterParams;
    } else {
      result = filterExpertCity;
    }
  } else {
    result = filterExpertCity;
  }
  res.status(200).json({ quotation_data: result, book_data: booking_data });
};

exports.getQuotationData = getQuotationData;
exports.getLeads = getLeads;
exports.getLeadsExperts = getLeadsExperts;
