import express from "express";
import { followArtist, unfollowArtist } from "../controllers/followController.js";

const router = express.Router();

// POST /api/artists/:artistId/follow - Follow an artist
router.post('/:artistId/follow', followArtist);

// DELETE /api/artists/:artistId/follow - Unfollow an artist
router.delete('/:artistId/follow', unfollowArtist);

export default router;
