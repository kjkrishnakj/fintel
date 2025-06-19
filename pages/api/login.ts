import type { NextApiRequest, NextApiResponse } from "next"
import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password required" })
    }

    try {
      const user = await User.findOne({ email })

      if (user && user.password === password) {
        return res.status(200).json({ success: true, email: user.email })
      }

      return res.status(401).json({ success: false, error: "Invalid credentials" })
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" })
}

export default connectDb(handler)
