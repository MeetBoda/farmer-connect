const express = require('express');
const multer = require('multer');
const path = require('path');
const CropDisease = require('../models/CropDisease');
const router = express.Router();
const ImgCounter = require('../models/ImgCounter');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
        callback(null, 'image-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Express route for uploading images
router.post('/upload', upload.single('image'), async (req, res) => {

    const posted_by_id = 5; // Example user ID, replace with your actual logic to get the user ID
    const { curr_id } = await ImgCounter.findOne({ counter: "id" });
    const image_id = curr_id;

    try {
        const imageUrl = req.file.filename;

        await CropDisease.create({
            imageUrl: imageUrl,
            posted_by_id: posted_by_id,
            image_id: image_id
        });

        res.json({ success: true, imageUrl: imageUrl });
        const imgcounter = await ImgCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1 } });
        console.log(imgcounter);

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
    
});
module.exports = router;