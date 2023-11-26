const express = require('express')
const router = express.Router()
const ValidateUser = require('../middleware/ValidateUser')
const ValidateLogin = require('../middleware/ValidateLogin')
var UserModel = require('../models/UserModel')
const MongoConnect = require('../db')
const bcrypt = require('bcryptjs');
const validateToken = require('../middleware/ValidateToken')
const jwt  = require("jsonwebtoken");
const mongoose = require("mongoose");
MongoConnect()

router.post('/',ValidateUser, async(req, res) => {
    try{
        var {user, password, name} = req.body;
        let date_created = new Date();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const usuario = new UserModel({user,salt, password: hashedPassword, name, date_created})
        await usuario.save();
        res.status(200).json(usuario);
    }catch(err){
        console.log(err);
        return res.status(404).send('Ups there was an error');
    }
})


router.post('/login', ValidateLogin, async(req, res)=>{
    try{
        var {user, password} = req.body;
        const users = await UserModel.findOne({user})
        if(!users)
            return res.status(400).send('user not found')
        
        const passwordmatch = await bcrypt.compare(password, users.password)
        if(!passwordmatch)
            return res.status(400).send('password mismatch')

        jwt.sign({user: users.name, id: users.id}, process.env.LOCALKEY,{expiresIn:"1h"}, (err, token) => {
        if(err)
            return res.status(500).json({status: 'unespected error'});
        return res.status(200).json({token: token, id:  users.id});
        });

    }catch(err){
        return res.status(404).send('Ups there was an error')
    }
});


router.get('/:id',validateToken, async (req, res)=>{
    try{
        var {id} = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send('Invalid user ID');
        }

        const usuario = await UserModel.findById(id)
        if(!usuario)
            return res.status(404).send('user not found')
        return res.status(200).json(usuario)
    }catch(err){
        return res.status(500).send('Ups there was an error')
    }
});

router.put('/:id',validateToken, async (req, res)=>{
    try{
        var {id} = req.params;
        const {user, password, name } = req.body
        const usuario = await UserModel.findById(id)

        if(!usuario)
            return res.status(404).send('user not found')

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const users = await UserModel.findByIdAndUpdate(id,{user, password: hashedPassword, name}  , {new:true})
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).send('Ups there was an error')
    }
});

router.delete('/:id', validateToken, async (req, res)=>{
    try{
        var {id} = req.params
        const usuario = await UserModel.findByIdAndDelete(id)
        if(!usuario)
            return res.status(404).send('user not found')
        return res.status(200).send('user deleted successfully');
    }catch{
        return res.status(500).send('Ups there was an error')
    }
})
module.exports = router;