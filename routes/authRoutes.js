import { userRegister, userLogin, artistRegister, artistLogin } from '../controllers/authController.js';
import express from "express";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', userRegister);
router.post('/artist-register', artistRegister);
router.post('/login', userLogin);
router.post('/artist-login', artistLogin);

export default router;