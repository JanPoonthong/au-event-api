import connectDB from "@/lib/mongodb"

export default async function handler(req, res) {
  const client = await connectDB()

  const database = client.db("au-event")
  const events = database.collection("event")

  const allEvents = await events.find({}).toArray();

  res.status(200).json({ success: true, data: allEvents });
}
