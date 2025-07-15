import mongoose from "mongoose"

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // optional: ensure unique team names
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Reference to assigned project (optional at start)
    },
    department: {
      type: String,
      required: true,
    },
    formedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The team lead / creator
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Array of user IDs
      },
    ],
    status: {
      type: String,
      enum: ["pending", "active", "disbanded"],
      default: "pending",
    },
    formationDate: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      type: String,
    },
    isLocked: {
      type: Boolean,
      default: false, // If true, no more edits (e.g., after project assignment)
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    minSize: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Team", teamSchema)
