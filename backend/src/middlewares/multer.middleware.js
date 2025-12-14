import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Relative path from project root
  },
  filename: function (req, file, cb) {
    const unique = uuidv4(); // Generating unique name
    cb(null, unique + path.extname(file.originalname)); // New name with original extension
  },
});

export const upload = multer({ storage });