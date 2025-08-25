import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  description: String,
  inviteLink: String,
  logo: String,
  skills: [String],
  formedBy: mongoose.Schema.Types.ObjectId,
  members: [mongoose.Schema.Types.ObjectId],
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },

    universityId: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    countryCode: String,
    academicYear: String,
    profilePicture: String,
    bio: { type: String },
    Gender: {
      type: String,
      enum: ["male", "female", "preferNot", "non-binary"],
    },

    department: String,
    role: { type: String, enum: ["admin", "student", "professor"] },
    studentId: String,
    employeeId: String,
    adminPosition: String,
    graduationYear: String,
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
    team: { type: teamSchema, default: null },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
