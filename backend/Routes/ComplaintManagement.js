const express = require('express');
const router = express.Router();
const User = require("../models/User");
const ComplaintCounter = require("../models/ComplaintCounter");
const Complaint = require("../models/Complaint");

router.post("/file-complaint", async(req, res) => {
    const { curr_id } = await ComplaintCounter.findOne({ counter: "id" });
    const complaint_id = curr_id;
    const {posted_by_id, posted_by, message} = req.body;
    try {
        const complaint = await Complaint.create({ complaint_id, message, posted_by, posted_by_id });
        const complaintcounter = await ComplaintCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1 } });
        res.status(200).json(complaint);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/all-complaints", async(req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;