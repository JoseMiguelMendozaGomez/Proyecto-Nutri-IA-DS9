const express = require('express')
require('dotenv').config()
const router = express.Router()
var GPTModel = require('../models/GPTModel')
var UserModel = require('../models/UserModel')
const ValidatePrompt = require('../middleware/ValidatePrompt')
const MongoConnect = require('../db')
// const ValidateToken = require('../middleware/ValidateToken')
const axios = require('axios');
const validateToken = require('../middleware/ValidateToken')
const { default: mongoose } = require('mongoose')
MongoConnect()


router.post('/', validateToken, ValidatePrompt , async(req, res) => {
    const message =  req.body.message;
    const id_user = req.user.id;
    let date = new Date();
    axios.post(process.env.APIURL, {
        "model": "gpt-3.5-turbo", 
        "messages": [{ 'role': "user", "content": message }
        ],
        "temperature": 1, 
        "max_tokens": 512, 
        "top_p": 1, 
        "frequency_penalty": 0, 
        "presence_penalty": 0,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.APIKEY}`
        }
    })
        .then(response => {
            const completion = response.data.choices[0].message.content;
            const GPT = new GPTModel({prompt: message,response: completion, id_user: id_user, date_created: date})
            GPT.save();
            res.status(200).json(GPT);
        })
        .catch(error => {
            console.log(error); 
            res.status(500).send('Ha ocurrido un error en la solicitud a la API de ChatGPT');
        });
});

router.get('/:id', validateToken, async (req, res)=>{
    try{
        var {id} = req.params;
        if(!mongoose.isValidObjectId(id))
            return res.status(400).send('Invalid user ID');
        
        const GPT = await GPTModel.findById(id);
        if(!GPT)
            return res.status(404).send('Prompt not found');
        return res.status(200).json(GPT)
    }catch(err){
        console.log(err);
        return  res.status(500).send('Ups there was an error');
    }
});

router.get('/user/:id_user', validateToken, async (req, res)=>{
    try{
        var {id_user} = req.params;
        if (!mongoose.isValidObjectId(id_user)) {
            return res.status(400).send('Invalid user ID');
        }
        const GPT = await GPTModel.find({id_user}).sort({date_created:-1})
        if(!GPT)
            return res.status(404).send('User prompt  not found')
        return res.status(200).json(GPT)
        
    }catch(err){
        console.log(err);
        return  res.status(500).send('Ups there was an error');
    }
});

router.get('/get/get-all', async (req, res)=>{
    try{
        const GPT = await GPTModel.find({}).count();
        if(!GPT)
            return res.status(404).send('prompts not found')

        const usuario = await UserModel.find({}).count();
        if(!usuario)
            return res.status(404).send('user not found')

        return res.status(200).json({chats:GPT, users: usuario})
    }catch(err){
        console.log(err);
        return  res.status(500).send('Ups there was an error');
    }
});


module.exports = router;