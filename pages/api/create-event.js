import connectDB from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const client = await connectDB();
    const database = client.db("au-event");
    const categoriesCollection = database.collection("categories");
    const eventsCollection = database.collection("events");

    const { name, date, time, category, description, imageURL } = req.body;

    // date and time need to merge into new Date()

    if (!name || !date || !time || !category || !description || !imageURL) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const categoryDoc = await categoriesCollection.findOne({ name: category });

    if (!categoryDoc) {
      return res.status(400).json({ success: false, message: "Category not found" });
    }

    const categoryId = categoryDoc._id;

    const newEvent = {
      name,
      description: description,
      imageURL,
      date: new Date(date),
      categoryId: new ObjectId(categoryId),
      createdAt: new Date(),
    };

    const result = await eventsCollection.insertOne(newEvent);

    res.status(201).json({ success: true, event: result });

  } catch (error) {
    console.error("Error inserting event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
