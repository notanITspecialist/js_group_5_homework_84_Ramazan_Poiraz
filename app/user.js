const express = require('express');
const router = express.Router();

const authorization = require('../middleware/authorization');

const User = require('../models/user');

router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
        newUser.createToken();
        await newUser.save();

        res.send({user: newUser});
    } catch (e) {
        res.send({error: e});
    }
});

router.post('/sessions', authorization, async (req, res) => {
    req.user.createToken();
    await req.user.save();
    res.send({token:req.user.token});
});

module.exports = router;