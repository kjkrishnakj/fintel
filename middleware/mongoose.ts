import mongoose from "mongoose"
import type { NextApiRequest, NextApiResponse } from "next"

const connectDb = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0]?.readyState === 1) {
      return handler(req, res)
    }

    const uri = "mongodb+srv://sanjusingh2472:fintel12345@cluster0.ch2v0aq.mongodb.net/fintel?retryWrites=true&w=majority"

    try {
      await mongoose.connect(uri)
      console.log("✅ MongoDB connected")
    } catch (error: any) {
      console.error("❌ MongoDB connection error:", error.message || error)
      return res.status(500).json({ message: "Database connection failed" })
    }

    return handler(req, res)
  }
}

export default connectDb
