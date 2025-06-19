import type { NextApiRequest, NextApiResponse } from "next"
import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(200).json({ success: "success" })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(400).json({ error: "Invalid method" })
  }
}

export default connectDb(handler)
