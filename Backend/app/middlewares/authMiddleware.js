const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthMiddleware {

    async verifyToken( req, res, next){
        try{
            let token;

            if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
                token = req.headers.authorization.split(" ")[1];
            }

            if(!token){
                return res.status(401).json({
                    success: false,
                    message: "Access denied. No token provided"
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.userId).select("-password");

            if (!user){
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

            req.user = user;
            next();
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }
    }
}

module.exports = new AuthMiddleware();