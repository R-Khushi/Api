const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret_Key = process.env.SECRET_KEY;

const signup = async(req,res) => {
    try{
        const {username,email,password} = req.body;
        //existing user check
    const existingUser = await userModel.findOne({email: email});
    if(existingUser){
        return res.status(400).json({message: 'User already exists'});
    }

    //hashed password
    if (!password) {
    return res.status(400).json({message: 'Password is required'});
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    //user creation
    const result = await userModel.create({
        email: email,
        password: hashedpassword,
        username: username
    });

    //create tokens
    const token = jwt.sign({ email: result.email, id: result._id }, Secret_Key, { expiresIn: '1h' });
    res.status(201).json({user: result, token: token});
}
catch(err){
    res.status(500).json({message: "Something went wrong!", error: err.message});
}}
const signin = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const existingUser = await userModel.findOne({email: email});
    if(!existingUser){
        return res.status(404).json({message: 'User not found'});
    }

    const matchpassword = await bcrypt.compare(password, existingUser.password);

    if(!matchpassword){
        res.status(400).json({message: 'Invalid Credentials'});
    }

    const token = jwt.sign( {email: existingUser.email , id: existingUser._id}, Secret_Key, { expiresIn: '1h' });
    res.status(200).json({user: existingUser, token: token});

    }
    catch(err){
        res.status(500).json({message: "Something went wrong!", error: err.message});
    }
}
module.exports = {signup,signin};