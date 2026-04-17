import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { parseFile } from 'music-metadata';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { uploadBoth } from '../middleware/uploadMiddleware.js';
import Song from '../models/song.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const postAudio = async (req, res) => {
  console.log('Upload request received');
  console.log('Files:', req.files);
  console.log('Body:', req.body);
  
  // Handle the file upload
  uploadBoth(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed',
      });
    }

    try {
      const { songName, genre } = req.body;
      const files = req.files;

      // Debug: Log files structure
      console.log('Files object:', JSON.stringify(files, null, 2));

      // Validate required fields
      if (!songName || !songName.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Song name is required',
        });
      }

      if (!genre || !genre.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Genre is required',
        });
      }

      if (!files || !files.audio || files.audio.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Audio file is required',
        });
      }

      // Get the uploaded files
      const audioFile = files.audio[0];
      
      // Check for cover image - handle both possible structures
      let coverFile = null;
      if (files.coverImage && files.coverImage.length > 0) {
        coverFile = files.coverImage[0];
      } else if (files['coverImage[]'] && files['coverImage[]'].length > 0) {
        coverFile = files['coverImage[]'][0];
      }

      // Create relative URLs for the files
      const audioUrl = `/uploads/audio/${path.basename(audioFile.filename)}`;
      const coverUrl = coverFile
        ? `/uploads/covers/${path.basename(coverFile.filename)}`
        : null;

      // Calculate duration using music-metadata
      let duration = 0;
      try {
        const metadata = await parseFile(audioFile.path);
        duration = Math.floor(metadata.format.duration || 0);
      } catch (error) {
        console.log('Error parsing audio metadata:', error);
        duration = 0;
      }

      // Get artist ID from token if available
      let artistId = null;
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          if (decoded.artistId) {
            artistId = decoded.artistId;
          }
        } catch (err) {
          console.log('Token verification failed:', err.message);
        }
      }

      // Create song record in database
      const newSong = await Song.create({
        name: songName.trim(),
        audioURL: audioUrl,
        coverURL: coverUrl,
        genre: genre.trim(),
        duration: duration,
        releaseDate: new Date(),
        artistId: artistId,
      });

      return res.status(201).json({
        success: true,
        message: 'Music uploaded successfully',
        data: {
          id: newSong.id,
          name: newSong.name,
          url: audioUrl,
          coverUrl: newSong.coverURL,
          genre: newSong.genre,
          duration: newSong.duration,
          releaseDate: newSong.releaseDate,
        },
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload music',
        error: error.message,
      });
    }
  });
};

// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll({
      order: [['releaseDate', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    console.error('Get songs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch songs',
      error: error.message,
    });
  }
};

// Get song by ID
export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByPk(id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    console.error('Get song error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch song',
      error: error.message,
    });
  }
};

// Get songs by artist
export const getSongsByArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    
    // Use pg directly to bypass Sequelize entirely
    const { Client } = pg;
    const client = new Client({
      connectionString: process.env.DB_URL
    });
    await client.connect();
    
    const result = await client.query(
      `SELECT id, name, album, "releaseDate", "audioURL", "coverURL", genre, duration, "createdAt", "updatedAt", "artistId" FROM songs WHERE "artistId" = $1 ORDER BY "releaseDate" DESC`,
      [artistId]
    );
    
    await client.end();

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Get artist songs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch artist songs',
      error: error.message,
    });
  }
};

