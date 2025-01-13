// console.log("JAI SHRI RAM, Jai Hanuman, Jai Bajrang Bali");
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
// console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 3000;
let isConnected = false;

app.use(bodyParser);
// app.use()

if (!isConnected) {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      isConnected = true;
      console.log("DB connected");
    });
  } catch (error) {
    console.error(error);
  }
} else {
  console.log("DB Already Connected");
}

async function listAllCollections() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    const db = client.db("cryptobuy");

    const collection = db.collection("instatransactionschemas");

    const documents = await collection
      .find({$and:[{fromAmount:{$lt:50}},{firstName:'Arun'}]})
      .toArray();

    if (documents.length > 0) {
      console.log(
        "Documents found:",
        documents,
        "Length is >>",
        documents.length
      );
    } else {
      console.log("No documents found.");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
}

listAllCollections();

app.listen(PORT, () => console.log(`server running on ${PORT}`));
