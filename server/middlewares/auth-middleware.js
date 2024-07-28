const jwt = require ("jsonwebtoken");
const User = require("../models/user_model");


const authMiddleware =async (req, res, next) => {
        const token = req.header("Authorization");

        if(!token) {
            return res.status(401).json({message: "No token provided, UnAuthorized HTTP"});
        }
        var jwtToken = token.replace("Bearer","").trim();
        try {
            const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
            const userData = await User.findOne({email:isVerified.email}).
            select({
                password:0,
            });
            req.user = userData;
            req.token = token;
            req.userID = userData._id;

            next();
        } catch (error) {
            return res.status(401).json({message: "UnAuthorized. Invalid Token"});
        }

        // Assuming token is in the format 
};


module.exports = authMiddleware;