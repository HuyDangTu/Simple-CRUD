const {User} = require('../models/user');

let auth = function(req,res,next){
    let token = req.cookies.u_auth || req.headers['x-access-token'];
    User.findByToken(token,(err,user)=>{
        if (err) return res.json({
            success: false,
            error: "Failed to authenticate token"
        });
        if(!user) return res.json({
            success: false,
            error: "Failed to authenticate token, user not found",
        });
        req.token = token;
        // console.log(user);
        req.user = user;
        next();
    });
}

module.exports = {auth}