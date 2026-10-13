const User = require('../models/Usermodel');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res, next) => {
    try{
            const {name, username, password, confirmPassword} = req.body;

    const user = await User.create({
        name,
        username,
        password,
        confirmPassword,
    });

    res.status(201).json({
        status: 'success',
        data:{
            user:{
                name: user.name,
                username: user.username,
            },
        },
    })
    } catch(error) {
        next(error)
    }
}

const loginUser = async(req, res, next) => {
    try{
        const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide username and password'
        })
    }

    const user = await User.findOne({username}).select('+password');

    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect username or password'
        })
    }
    
    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
            user: {
                name: user.name,
                username: user.username,
            },
        }
    })
    } catch(error) {
        next(error)
    }

}

module.exports = {
    registerUser,
    loginUser,
}