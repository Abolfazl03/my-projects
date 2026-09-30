const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'type in your name'],
        trim: true,
    },
    username:{
        type:String,
        required: [true, 'type in your username'],
        unique:[true, 'this username was already taken'],
    },
    password:{
        type:String,
        required: [true, "Enter you're password"],
        maxlength : [20, 'password in too long'],
        minlength: [4, 'password is too short'],
        select : false
    },
    confirmPassword:{
        type: String,
        validate:{
            validator: function(pass){
                return this.password === pass;
            },
            message: 'passwords are not the same'
        }
    }
});

userschema.pre('save', async function(next){
    
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next()
})




const User = mongoose.model('User', userschema)

module.exports = User;