const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB;

export default async function connectDB() {
  const client = new MongoClient(uri);
  return client;
}
