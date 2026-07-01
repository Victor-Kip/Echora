import express from "express";
import { postAudio, getAllSongs, getSongById, getSongsByArtist, updateSong, deleteSong } from "../controllers/audioController.js";

const router = express.Router();

// POST /api/audio/new - Upload new music
router.post('/new', postAudio)

// GET /api/audio - Get all songs
router.get('/', getAllSongs)

// GET /api/audio/artist/:artistId - Get songs by artist (MUST be before /:id)
router.get('/artist/:artistId', getSongsByArtist)

// GET /api/audio/:id - Get song by ID
router.get('/:id', getSongById)

// PUT /api/audio/:id - Update song
router.put('/:id', updateSong)

// DELETE /api/audio/:id - Delete song
router.delete('/:id', deleteSong)

export default router
