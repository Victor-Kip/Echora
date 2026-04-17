import express from "express";
import { postAudio, getAllSongs, getSongById, getSongsByArtist } from "../controllers/audioController.js";

const router = express.Router();

// POST /api/audio/new - Upload new music
router.post('/new', postAudio)

// GET /api/audio - Get all songs
router.get('/', getAllSongs)

// GET /api/audio/:id - Get song by ID
router.get('/:id', getSongById)

// GET /api/audio/artist/:artistId - Get songs by artist
router.get('/artist/:artistId', getSongsByArtist)

export default router