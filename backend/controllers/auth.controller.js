import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { username, password, email } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashPass, email });

    try {
        await newUser.save();
        res.status(201).json('User Created Successfully!');
    } catch (error) {
        res.status(500).json(error.message);
    }

};