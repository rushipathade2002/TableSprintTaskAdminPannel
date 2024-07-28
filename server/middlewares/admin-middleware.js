const User = require("../models/user_model");

const adminMiddleware = async( req, res, next)=>{
    try {
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message:"Access Denied. User is not an admin."});
        }

        // If user is an admin, proceed to the next middleware
        next()
        
        
    } catch (error) {
        next(error);
    }
}



module.exports = adminMiddleware;   
