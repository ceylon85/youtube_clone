const express = require('express');
const router = express.Router();
const {Comment} = require("../models/Comment");

//comment mongoDB에 저장
router.post("/saveComment", (req, res) => {
    //모든 client에서 가져온 정보를 넣어준다
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) 
            return res.json({success: false, err})
        
        //저장한 전체정보를 가져온다.
        Comment
            .find({'_id': comment._id})
            .populate('writer')
            .exec((err, result) => {
                if (err) 
                    return res.json({success: false, err});
                res
                    .status(200)
                    .json({success: true, result})
            })
    })
});

module.exports = router;