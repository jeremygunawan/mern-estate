import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashPass, email });
    const minPasswordLength = 5;

    if(password.length < minPasswordLength){
        next(errorHandler(550,'Password length minimum ' + minPasswordLength));
    }

    try {
        await newUser.save();
        res.status(201).json('User Created Successfully!');
    } catch (error) {
        next(error);
    }

};

export const signin = async (req, res, next) => {
    const { password, email } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);

    try {
        const validUser = await User.findOne({email: email});
        if(!validUser) return next(errorHandler(404, 'User Not Found!'));
        
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));

        const {password: pass, ...rest} = validUser._doc;

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }

};