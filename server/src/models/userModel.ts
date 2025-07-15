import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    universityId: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    countryCode: String,
    academicYear: String,
    department: String,
    role: { type: String, enum: ["admin", "student", "professor"] },
    studentId: String,
    employeeId: String,
    adminPosition: String,
    graduationYear: String,
    profilePicture: String,
    isTeamAlloted: {
      type: Boolean,
      default: false,
    },
    isProjectAlloted: {
      type: Boolean,
      default: false,
    },
    isDetained: {
      type: Boolean,
      default: false,
    },
    isTeamLead: {
      type: Boolean,
      default: false,
    },
    token: { type: String },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
