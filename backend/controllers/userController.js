import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user Login
const loginUser = async (req,res)  => {
    try {
        const {email,password} = req.body;

        // checking user already  exists or not
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({message:"User does not exists"});
        }
        // checking user password
        const isMatch = await bcrypt.compare(password,user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({sucess:true,token});
        }
        else{
            return res.status(400).json({message:"Invalid Credentials"});
        }

        

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}


// Route for user register
const registerUser = async (req,res)  => {
    try {
        const {name,email,password} = req.body;

        // checking user already  exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.status(400).json({message:"User already exists"});
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({message:"Please Enter a Valid Email"});
        }
        if (password.length < 8) {
            return res.status(400).json({message:"Please Enter a Strong Password"});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // creating new user
        const newUser = new userModel({name,email,password:hashedPassword});
        const user = await newUser.save();
        res.status(200).json({message:"User Created Successfully"});

        const token = createToken(user._id)

        res.json({sucess:true,token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

// Route for admin login
const adminLogin = (req, res) => {
    const { email, password } = req.body;

    // Check if credentials match those in .env
    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        // Generate token
        const token = jwt.sign(
            { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
            process.env.JWT_SECRET
        );
        return res.json({ success: true, token });
    } else {
        return res.json({ success: false, message: "Invalid credentials" });
    }
};



export {loginUser,registerUser,adminLogin}