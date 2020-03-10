const express = require('express');
const router = express.Router();

const Task = require('../models/task');

const checkAuth = require('../middleware/checkAuthorization');

router.post('/', checkAuth, async (req, res) => {
    if(req.body.user !== req.user._id) res.status(400).send({error: 'User id is incorrect'});

    try {
        const newTask = await Task.create(req.body);

        res.send({id: newTask._id})
    } catch (e) {
        res.status(400).send({error: e})
    }
});

router.get('/', checkAuth, async (req, res) => {
   try {
       const data = await Task.find({user: req.user});

       res.send(data);
   }  catch (e) {
       res.status(400).send({error: e})
   }
});

router.put('/:id', checkAuth, async (req, res) => {
    if(!req.body.title || !req.body.status) res.status(400).send({error: 'Title or status is not found'});

    const whiteList = req.body.description ? {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    } : {
        title: req.body.title,
        status: req.body.status
    };
   try {
       await Task.updateOne({_id: req.params.id}, {$set: whiteList});

       res.send({message: `Element with ${req.params.id} is updated`})
   } catch (e) {
       res.status(400).send({error: e})
   }
});

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id});

        if(task.user.toString() !== req.user._id.toString()) res.status(400).send({error: 'Its not your task'});
        await Task.deleteOne({_id: req.params.id});

        res.send({message: `Element with ${req.params.id} id is deleted`})
    } catch (e) {
        res.status(400).send({error: e})
    }
});

module.exports = router;