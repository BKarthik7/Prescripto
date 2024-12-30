import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
        const userId = req.body.userId || "default"; // Default user if no ID provided
        const uploadPath = `uploads/${userId}`;  // User-specific folder

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        callback(null, uploadPath); // Pass the upload path to Multer
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`); // Append a timestamp to the original file name
    }
});

const upload = multer({ storage: storage })
const upload1 = multer({ storage: storage1 });

export { upload, upload1 };