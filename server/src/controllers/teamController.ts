import { Request, Response } from "express";
import Team from "../models/teamModel";
import userModel from "../models/userModel";

export const addTeam = async (req: Request, res: Response) => {
  try {
    const { teamName, teamDescription, inviteLink, skills, createdBy } =
      req.body;

    if (!teamName || !teamDescription) {
      return res.status(400).json({
        success: false,
        message: "Team name, description, and creator are required",
      });
    }

    let creator = await userModel.findById(createdBy);

    if (creator) creator.isTeamLead = true;

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const logoPath = (req.file as Express.Multer.File)?.path || null;

    // Create the actual Team document in Team collection
    const teamDoc = await Team.create({
      name: teamName,
      description: teamDescription,
      inviteLink,
      logo: logoPath,
      skills:
        typeof skills === "string"
          ? skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : skills,
      formedBy: creator._id,
      members: [creator._id],
    });

    // Store the full team object inside user
    creator.team = teamDoc.toObject(); // Embed full team
    creator.isTeamAlloted = true;

    await creator.save();

    return res.status(201).json({
      success: true,
      team: teamDoc,
      userWithTeam: creator,
    });
  } catch (error) {
    console.error("Create Team Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create team",
      error,
    });
  }
};
