const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const home = async ( req, res)=>{
    try {
        res.status(200).send("Welcome to world route")
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res)=>{
    try {
        const {username, email, phone, password} = req.body;
        console.log(req.body);
        const userExists =await User.findOne({email:email});
        if(userExists){
            return res.status(400).json({message:"Email already exists"});
        }
        const userCreated = await User.create({username, email, phone, password});
        res.status(201).json({msg : userCreated,
             token: await userCreated.generateToken(), 
             userId:userCreated._id.toString(),  
        });
    } catch (error) {
        res.status(400).send({message:"page not found"});
    }
};

// User Login Logic

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExists = await User.findOne({email});

        if(!userExists){
            res.status(400).send({message:"Invalid Email or password!"});
        }
        const user = await userExists.comparePassword(password);
        if(user){
            res.status(200).json({
                message : "Login Successful",
                token: await userExists.generateToken(), 
                userId:userExists._id.toString(), 
            });
        }else{
            res.status(401).json({message : "Invalid email or password"})
        }
    } catch (error) {
          res.status(500).send({message:"page not found"});
    }
}

const user = async( req, res)=>{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from the user route ${error}`);
    }
}

module.exports = {home, register, login, user};