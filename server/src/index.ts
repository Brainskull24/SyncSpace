import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/authRoutes"
import projectRoute from "./routes/projectRoutes"
import mongoose from "mongoose"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)


// Define routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/projects", projectRoute)

const PORT = process.env.PORT || 9999
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => console.error("MongoDB error:", err))
