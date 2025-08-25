import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // optional: ensure unique team names
    },
    description: {
      type: String,
      required: true,
    },
    inviteLink: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      default: null, // URL or path to the logo image
    },
    skills: {
      type: [String],
      default: [],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    formedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The team lead / creator
      required: true,
    },
    applications: {
      type: [{
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true,
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        }
      }],
      default: [],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    maxSize: {
      type: Number,
      default: 4,
    },
    minSize: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
