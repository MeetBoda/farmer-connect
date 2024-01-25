const express = require('express');
const router = express.Router();
const Question = require("../models/Question");
const QuestionCounter = require("../models/QuestionCounter");
const User = require("../models/User");

const question_upload_points = 10;
const answer_upload_points = 10;
const comment_upload_points = 2;

router.post("/upload-question", async(req, res) => {
    const {curr_id} = await QuestionCounter.findOne({counter: "id"});
    const question_id = curr_id;
    const {question_title, question, posted_by_id} = req.body;
    const time = new Date();
    try{
        const ques = await Question.create({question_id, question_title, question, time, posted_by_id});
        const questioncounter = await QuestionCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
        const rating = await User.findOneAndUpdate({user_id:posted_by_id},{"$inc":{"rating":question_upload_points}});
        res.status(200).json(ques);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})



module.exports = router;