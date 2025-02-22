import connectDB from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await connectDB();
  const database = client.db("au-event");
  const events = database.collection("events");

  const {eventId, updateData} = req.body;

  if (!eventId || !ObjectId.isValid(eventId)) {
    return res.status(400).json({success: false, message: "Invalid event ID"})
  }

  const result = await event.updateOne({_id: new ObjectId(eventId)}, {$set: updateData})

  if (result.modifiedCount === 0) {
    return res.status(404).json({ success: false, message: "Event not found or no changes made" });
  }

  res.status(200).json({ success: true, message: "Event updated successfully" }
}
