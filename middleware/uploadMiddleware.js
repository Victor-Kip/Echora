import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads");
const audioDir = path.join(uploadsDir, "audio");
const coverDir = path.join(uploadsDir, "covers");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}
if (!fs.existsSync(coverDir)) {
  fs.mkdirSync(coverDir, { recursive: true });
}

// Storage configuration for audio files
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, audioDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Storage configuration for cover images
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, coverDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for audio files
const audioFileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|ogg|mpeg|mp4|m4a|aac|webm/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype.replace('audio/', ''));

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error(`Only audio files are allowed (mp3, wav, ogg, mpeg, mp4, m4a, aac, webm). Received: ${file.mimetype}`));
  }
};

// File filter for image files
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

// Upload middleware for audio files
export const uploadAudio = multer({
  storage: audioStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for audio files
  },
  fileFilter: audioFileFilter,
}).single("audio");

// Upload middleware for cover images
export const uploadCover = multer({
  storage: coverStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for cover images
  },
  fileFilter: imageFileFilter,
}).single("coverImage");

// Combined upload middleware for both audio and cover
export const uploadBoth = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "audio") {
        cb(null, audioDir);
      } else {
        cb(null, coverDir);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "audio") {
      const allowedTypes = /mp3|wav|ogg|mpeg|mp4|m4a|aac|webm/;
      const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype.replace('audio/', ''));
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error(`Only audio files are allowed (mp3, wav, ogg, mpeg, mp4, m4a, aac, webm). Received: ${file.mimetype}`));
      }
    } else {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(
          new Error(
            "Only image files are allowed (jpeg, jpg, png, gif, webp)"
          )
        );
      }
    }
  },
}).fields([
  { name: "audio", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);
