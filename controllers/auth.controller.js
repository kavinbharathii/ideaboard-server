
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

const registerPost = async (req, res) => {
    const { username, password, isGuard, phoneNumber, lastSubmitted } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const alreadyExistingUser = await User.findOne({ username });

    if (alreadyExistingUser) {
        console.log("User already exists");
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = new User({
        username,
        password: hashedPassword,
        isGuard,
        phoneNumber,
        lastSubmitted
    });

    console.log("Registration end point hit");

    try {
        await user.save();
        req.session.userid = user._id;
        return res.status(201).send('User created successfully');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const loginPost = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        console.log("User not found");
        return res.status(404).send('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        console.log("Invalid password");
        return res.status(401).send('Invalid password');
    }

    req.session.userid = user._id;
    console.log(req.session);
    return res.status(200).send('Logged in successfully');
}

const isSignedIn = async (req, res) => {
    if (req.session.userid) {
        const user = await User.findById(req.session.userid);

        return res.status(200).json({
            username: user.username
        });
    } else {
        return res.status(200).json({
            data: "You are not logged in"
        });
    }
}

export default {
    registerPost,
    loginPost,
    isSignedIn
}
