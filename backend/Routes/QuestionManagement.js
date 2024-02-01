const express = require('express');
const router = express.Router();
const Question = require("../models/Question");
const QuestionCounter = require("../models/QuestionCounter");
const User = require("../models/User");
const AnswerCounter = require("../models/AnswerCounter")
const DOMPurify = require('isomorphic-dompurify');

const question_upload_points = 10;
const answer_upload_points = 10;
const comment_upload_points = 2;

router.post("/upload-question", async (req, res) => {
    const { curr_id } = await QuestionCounter.findOne({ counter: "id" });
    const question_id = curr_id;
    const { question_title, question, posted_by, posted_by_id } = req.body;
    const time = new Date();
    try {
        const ques = await Question.create({ question_id, question_title, question, time, posted_by, posted_by_id });
        const questioncounter = await QuestionCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1 } });
        const rating = await User.findOneAndUpdate({ user_id: posted_by_id }, { "$inc": { "rating": question_upload_points } });
        res.status(200).json(ques);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.get("/display-all-questions", async (req, res) => {
    const questions = await Question.find({});
    // console.log(questions)
    res.status(200).json(questions);
})

router.get("/specific-question", async (req, res) => {
    const question_id = req.query.question_id;
    const question = await Question.findOne({ question_id: question_id });
    console.log(question);
    res.status(200).json(question);
})

router.post("/upload-answer", async (req, res) => {
    const { curr_id } = await AnswerCounter.findOne({ counter: "id" });
    const answer_id = curr_id;
    const { ans, question_id, posted_by, posted_by_id } = req.body;

    // Sanitize the answer content
    const sanitizedContent = DOMPurify.sanitize(ans);
    console.log("Original Answer:", ans);
    console.log("Sanitized Answer:", sanitizedContent);

    console.log(req.body);
    const time = new Date();
    console.log(ans);
    console.log(question_id);
    console.log(posted_by);
    const answer = await Question.findOneAndUpdate(
        {
            question_id: question_id
        },
        {
            "$push": {
                "answer": {
                    answer_id,
                    ans : sanitizedContent,
                    posted_by,
                    posted_by_id,
                    time
                }
            }
        }
    );
    const checkanswer = await Question.findOne({ question_id: question_id });
    //console.log(checkanswer.answer);
    const answercounter = await AnswerCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1 } });
    const rating = await User.findOneAndUpdate({ user_id: posted_by_id }, { "$inc": { "rating": answer_upload_points } });
    return res.status(200).json(checkanswer);
});

module.exports = router;