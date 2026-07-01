import express from "express";
import { createPost, getFeed, updatePost, deletePost, votePoll } from "../controllers/postController.js";
import { followArtist, unfollowArtist } from "../controllers/followController.js";

const router = express.Router();

// POST /api/posts - Create a new post
router.post('/', createPost);

// PUT /api/posts/:id - Update a post
router.put('/:id', updatePost);

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', deletePost);

// GET /api/posts/feed - Get global post feed
router.get('/feed', getFeed);

// POST /api/posts/vote - Vote in a poll
router.post('/vote', votePoll);

// POST /api/artists/:artistId/follow - Follow an artist
router.post('/artists/:artistId/follow', followArtist);

// DELETE /api/artists/:artistId/follow - Unfollow an artist
router.delete('/artists/:artistId/follow', unfollowArtist);

export default router;
