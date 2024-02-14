const express = require('express');
const router = express.Router();
const Question = require("../models/Question");
const QuestionCounter = require("../models/QuestionCounter");
const User = require("../models/User");
const AnswerCounter = require("../models/AnswerCounter")
const DOMPurify = require('isomorphic-dompurify');
const QuestionCommentCounter = require('../models/QuestionCommentCounter')

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

router.post("/like-question", async(req, res) => {

    const {question_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Question.findOne({question_id : question_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
            console.log(addvote);
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = 1;
            console.log("else");
            const addvote = await Question.findOneAndUpdate({question_id : question_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");
})

router.post("/remove-like-question" , async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const removevote = await Question.findOneAndUpdate({question_id : question_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

router.post("/convert-dislike-to-like-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 2}});
        console.log("Dislike to Like");

        res.status(200).json("Like Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

router.post("/convert-like-to-dislike-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -2}});
        console.log("Like to Dislike");
        res.status(200).json("Dislike Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

router.post("/remove-dislike-question" , async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const removevote = await Question.findOneAndUpdate({question_id : question_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

router.post("/dislike-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Question.findOne({question_id : question_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
            console.log(addvote);
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = -1;
            console.log("else");
            const addvote = await Question.findOneAndUpdate({question_id : question_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");
})

router.post("/comment-on-question", async(req, res) => {
    const {curr_id} = await QuestionCommentCounter.findOne({counter: "id"});
    const comment_id =curr_id;
    const {message, question_id, posted_by, posted_by_id} = req.body;
    const time = new Date();
    const comment = await Question.findOneAndUpdate({question_id: question_id},{"$push":{"comments":{comment_id, message, posted_by, posted_by_id, time}}});
    const checkcomment = await Question.findOne({question_id: question_id});
    const rating = await User.findOneAndUpdate({user_id:posted_by_id},{"$inc":{"rating":comment_upload_points}});
    const questioncommentcounter = await QuestionCommentCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
    return res.status(200).json(checkcomment);
});

module.exports = router;