const mongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const url = process.env.DB_URL;
const client = new mongoClient(url);
const dbName = "SnapdealScrap";
const { fetch, parseProductDetails, parseProductLinks } = require("./scrapper");

client
  .connect()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("could not connect", err);
  });

const db = client.db(dbName);
const collection = db.collection("Products");

async function scrapper(pageNo) {
  const Products = [];
  if (pageNo === 0) {
    return "completed";
  }
  const SnapdealData = await fetch(
    `https://www.snapdeal.com/acors/json/product/get/search/0/${pageNo}/20?q=&keyword=tshirt`
  ).catch((err) => console.log("can't fetch data", err));

  const productLink = await parseProductLinks(SnapdealData);
  for (let i of productLink) {
    const productDom = await fetch(i);
    const data = parseProductDetails(productDom);
    Products.push(data);
  }
    Products.map(async (result) => {
      try {
        await collection.insertOne(result);
        console.log("data saved");
      } catch (error) {
        console.error("can not save data");
      }
    });
    return scrapper(pageNo - 1);
  }

scrapper(10);
