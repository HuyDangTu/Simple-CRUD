const express = require("express");
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');
var jsonParser = bodyParser.json();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");

//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

//AUTH
router.get('/api/users/auth',auth,(req, res) => {
    res.status(200).json({
        avt: req.user.avt,
        _id: req.user._id,
        isAuth: true,
        name: req.user.name,
        phone: req.user.name,
        email: req.user.email,
        userName: req.user.userName
    })
});

//REGISTER 
router.post('/api/users/register', auth, jsonParser, (req, res) => {
    console.log(req.body);
    let message = "", isValidUserName = false;
    User.findOne({ userName: req.body.userName }, (err, user) => {
        console.log(user)
        if (user) {
            message += "Username đã được sử dụng!";
            //isValidUserName = false;
            res.json({ success: false, err: message });
        } else {
            //isValidUserName = true;
            const newUser = new User(req.body);
            newUser.save((err, user) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json({
                    success: true,
                    message: "User created"
                });
            });
        }
    })
    // .then(() => {
    //     if(isValidUserName){
    //         const newUser = new User(req.body);
    //         newUser.save((err, user) => {
    //             if (err) return res.json({ success: false, err});
    //             res.status(200).json({
    //                 success: true,
    //                 message: "User created"
    //             });
    //         });
    //     } else {
    //         res.json({ success: false, err: message });
    //     }
    // })
});

//LOGOUT
router.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },//tìm theo id
        { token: '' },//update token của user tìm đc bằng rổng
        //callback function 
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            res.clearCookie('u_auth').status(200).send({
                success: true
            })
        }
    )
})


//LOGIN
router.post('/api/users/login', jsonParser, (req, res) => {
    // find the email
    console.log(req.body.userName)
    User.findOne({ 'userName': req.body.userName }, (err, user) => {
        if (!user) return res.json({ success: false, message: 'Authentication fails, User not found' });
        //check password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ Success: false, message: 'Authentication fails, wrong password' })
            user.gennerateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //gennerate Token
                res.cookie('u_auth', user.token, { maxAge: 180000 }).status(200).json({
                    success: true,
                    message: "User đã được cấp phát token",
                    token: user.token
                });
            });
        });
    });
})

// LOGIN BY
router.post('/api/users/loginByFaceGoogle', jsonParser, (req, res) => {
    // find the email
    User.findOne({'email': req.body.email, 'isActive': true }, (err, user) => {
        if (!user) return res.json({ loginSuccess: false, message: 'Auth fail, No account found' });
        user.gennerateToken((err, user) => {
            if (err) return res.status(400).send(err);
            //gennerate Token
            res.cookie('u_auth', user.token, { maxAge: 180000 }).status(200).json({
                success: true,
                message: "User đã được cấp phát token",
                token: user.token
            });
        });
    });
})

//UPLOAD IMG
router.post('/api/users/uploadimage', auth, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url,
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: `auto`
    })
})

//UPDATE PIC
router.put('/api/users/updatepic/:id', auth, (req, res) => {
    
    User.findByIdAndUpdate(req.params.id, { $set: { avt: req.body.url } }, { new: true },
    (err, result) => {
        if (err) {

            return res.status(422).json({ error: "pic canot post" })
        }
        res.json(result)
    })
})

module.exports = router;