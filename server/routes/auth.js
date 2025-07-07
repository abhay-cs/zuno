const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'


router.post('/signup', async( req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.create({email, password});
        const token = jwt.sign({id: user._id}, JWT_SECRET);
        res.json({token});
    }catch (err){
        res.status(400).json({error: "Email already exists"});
    }
})

router.post('/login', async( req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user || !(await user.comparePassword(password))){
        return res.status(401).json({error: "Invalid credentials"})
    }
    const token = jwt.sign({id: user._id}, JWT_SECRET);
    res.json({token});
});

module.exports = router;