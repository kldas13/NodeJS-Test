const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get('/mario', async (req,res)=>{
    const mario = await marioModel.find();
    try {
        res.status(200).json({
            status: "Success",
            Characters: [mario]
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message: error.message
        })
    }
});


app.get('/mario/:id', async (req,res)=>{
    try {
        const mario = await marioModel.find({_id:req.params.id});

        if(mario.length==0) {
            return res.status(400).json({
                status : "Failed",
                message: "Invalid ID"
            })
        }
        res.status(200).json({
            status: "Success",
            mario
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message: error.message
        })
    }
});


app.post('/mario', async (req,res)=>{

    try {
        const mario = await marioModel.create(req.body);
        if(!req.body.name || !req.body.weight) {
            return res.status(400).json({
                status:"Failed",
                message: "either name or weight is missing"
            })
        }
        res.status(201).json({
            status: "Success",
            mario
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message: "either name or weight is missing"
        })
    }
});

app.delete('/mario/:id', async (req,res)=>{

    try {
        const mario = await marioModel.deleteOne({_id:req.params.id});
        res.status(200).json({
            status: "Success",
            message: "Character Deleted",
            mario
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message: "Invalid ID"
        })
    }
});

app.patch('/mario/:id', async (req,res)=>{

    try {
        const mario = await marioModel.updateOne({_id:req.params.id}, req.body);
        if(!req.body.name || !req.body.weight) {
            return res.status(400).json({
                status:"Failed",
                message: "either name or weight is missing"
            })
        }
        res.status(201).json({
            status: "Success",
            mario
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message: "Invalid ID"
        })
    }
});


module.exports = app;