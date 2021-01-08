const express = require("express");
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const { User } = require("../models/user");
const { auth } = require('../middleware/auth');

//UPDATE
router.put('/api/users/update/:id', auth, jsonParser, (req, res) => {
    // let message = "", isValidUserName = false;
    // User.findOne({ userName: req.body.userName }, (err, user) => {
    //     console.log(user)
    //     if (user) {
    //         message += "Username đã được sử dụng!";
    //         isValidUserName = false;
    //     } else {
    //         isValidUserName = true;
    //     }
    // }).then(()=>{
    //     if (isValidUserName){
        User.findByIdAndUpdate(req.params.id,
        {
            $set: {
                userName: req.body.userName,
                phone: req.body.phone,
                email: req.body.email,
                name: req.body.name,
            }
        }, {
        new: false
        }, function (err, doc) {
            if (err) {
                res.send(err)
            }
        }).then(result =>
            res.json(result)
        )
    //     }else{
    //         res.json({success: false,mess: "username đã được sử dụng"})
    //     }
    // })
})


//DELETE
router.post('/api/users/delete', jsonParser, (req, res) => {
    User.findByIdAndUpdate(req.body.id,
        {
            $set: {
                isActive: false
            }
        }, {
        new: false
    }, function (err, doc) {
        if (err) {
            res.send(err)
        }
    }).then(result =>
        res.json({ messs: "Đã xóa", result })
    )
})

//GET USER LIST
router.get('/api/users', auth, (req, res) => {

    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    User.aggregate([
    {
        $match: { "isActive": true }
    },
    {
        "$project": {
            "_id": 1,
            "avt": 1,
            "email": 1,
            "password": 1,
            "userName": 1,
            "name": 1,
        }
    },
    { "$sort": { createdAt: -1 } },
    ], function (err, accounts) {
            
        if (err) return res.status(400).send(err);
        res.status(200).json({
            accounts: accounts,
            size: accounts.length
        });
    }
    )
})

//GET USER

router.get('/api/users/info/:id', auth, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
                    res.json(user)
                })
        .catch(err => {
            return res.status(404).json(err)
        })
})
//DETETE USER
router.put('/api/users/delete/:id', auth, (req, res) => {
    User.findByIdAndUpdate(req.params.id,
        {
            $set: {
                isActive:false
            }
        }, {
        new: false
    }, function (err, doc) {
        if (err) {
            res.send(err)
        }
    }).then(result =>
        res.json(result)
    )
})

module.exports = router;