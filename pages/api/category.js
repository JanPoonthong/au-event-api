import connectDB from "@/lib/mongodb"

export default async function handler(req, res) {
  const client = await connectDB()

  const database = client.db("au-event")
  const categories = database.collection("categories")

  const allCategories = await categories.find({}).toArray();

  res.status(200).json({ success: true, data: allCategories });
}
