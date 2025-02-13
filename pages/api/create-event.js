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

    const { name, date, location, category, description } = req.body;

    if (!name || !date || !location || !category) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const categoryDoc = await categoriesCollection.findOne({ name: category });

    if (!categoryDoc) {
      return res.status(400).json({ success: false, message: "Category not found" });
    }

    const categoryId = categoryDoc._id;

    const newEvent = {
      name,
      date: new Date(date),
      location,
      description: description || "",
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

