import jwt from "jsonwebtoken";
import Follow from "../models/follow.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const followArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const followerId = decoded.userId || decoded.id || decoded.artistId;

    if (!followerId) return res.status(401).json({ success: false, message: "Invalid token" });

    // Check if already following
    const existingFollow = await Follow.findOne({
      where: { follower_id: followerId, following_id: artistId }
    });

    if (existingFollow) {
      return res.status(400).json({ success: false, message: "You are already following this artist" });
    }

    await Follow.create({
      follower_id: followerId,
      following_id: artistId,
      following_type: 'artist'
    });

    return res.status(201).json({ success: true, message: "Successfully followed artist" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const unfollowArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const followerId = decoded.userId || decoded.id || decoded.artistId;

    const follow = await Follow.findOne({
      where: { follower_id: followerId, following_id: artistId }
    });

    if (!follow) return res.status(404).json({ success: false, message: "Follow relationship not found" });

    await follow.destroy();
    return res.status(200).json({ success: true, message: "Successfully unfollowed artist" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
