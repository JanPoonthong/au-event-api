import connectDB from "@/lib/mongodb"

export default async function handler(req, res) {
  const client = connectDB()

  const database = client.db("au-event")
  const categories = database.collection("event")

  const { name, date, location, category, description } = req.body;

  if (!name || !date || !location || !category) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const newEvent = {
    name,
    date: new Date(date),
    location,
    description: description || "",
    category,
    createdAt: new Date(),
  };

  const result = await collection.insertOne(newEvent);

  res.status(201).json({ success: true, event: result });
}
