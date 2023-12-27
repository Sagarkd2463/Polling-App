const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Pusher = require('pusher');
const Vote = require('../models/vote');

const pusher = new Pusher({
    appId: "1730660",
    key: "4af49e647155e3aea29a",
    secret: "d2e7bb3eadb1371944fb",
    cluster: "ap2",
    useTLS: true
  });

router.get('/', (req, res) => {
    Vote.find().then((votes) => res.json({
        success: true,
        votes: votes
    }));
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger("os-poll", "os-vote", {
            points: parseInt(vote.points),
            os: vote.os
        });
    
        return res.json({ success: true, message: 'Thank you for voting!'});
    });
});

module.exports = router;