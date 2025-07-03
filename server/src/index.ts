import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/authRoutes"
import mongoose from "mongoose"
import { errorHandler } from "./middlewares/errorHandler"

dotenv.config()
const app = express()

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())

app.use("/api/v1/auth", authRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 9999

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => console.error("MongoDB error:", err))
