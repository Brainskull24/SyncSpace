import mongoose from "mongoose"

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
    isTeamLead: Boolean,
    token: { type: String }, 
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
