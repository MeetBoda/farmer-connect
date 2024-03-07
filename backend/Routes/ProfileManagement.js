const express = require('express');
const router = express.Router();
const Question = require("../models/Question");
const QuestionCounter = require("../models/QuestionCounter");
const User = require("../models/User");
const AnswerCounter = require("../models/AnswerCounter")
const DOMPurify = require('isomorphic-dompurify');
const QuestionCommentCounter = require('../models/QuestionCommentCounter')

router.get("/profile/myques", async(req, res) => {
    const user_id = req.query.user_id;
    const questions = await Question.find({posted_by_id : user_id});
    res.status(200).json(questions);
})

router.get("/profile/info", async(req, res) => {
    const user_id = req.query.user_id;
    const user = await User.find({user_id:user_id});
    //console.log(user);
    res.status(200).json(user);
})

router.get("/profile/myanswers", async(req, res) => {
    const user_id = req.query.user_id;
    const answers = await Question.find({"answer": {$elemMatch: {"posted_by_id": user_id}}});
    res.status(200).json(answers);
})

router.post("/edit-answer", async(req, res) => {
    const {ans, answer_id, question_id} = req.body; 
    try{
        const answerupdatetitle = await Question.findOneAndUpdate({question_id:question_id, "answer.answer_id":answer_id},{"$set":{"answer.$.ans":ans}});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});
module.exports = router;