const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
const Schema = mongoose.Schema;
require('dotenv').config();

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 100
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    phone: {
        type: Number,
        // required: true,
        minlength: 11,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: ""
    },
    avt:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3F_4AEBUvIOQPFqcVFUsh5_eFIAHcdtExdA&usqp=CAU"
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                    next();
                });
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.gennerateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET)

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

//export module User
module.exports = { User }