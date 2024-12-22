import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
//register
// localhost:8000/api/auth/register
dotenv.config();
export const register = async (req, res, next) => {
  try {

    console.log('call')
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create a new user instance
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });

    // Save the new user to the database
    await newUser.save();

    // Set up nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Registration Successful',
      text: `Hello ${req.body.username},\n\nThank you for registering on our platform! Your account has been created successfully.\n\nBest regards,\nLalit Khairnar`,
    };

    // Send the email asynchronously and handle any errors
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    // Send success response
    res.status(200).send({
      success: true,
      message: 'User registered successfully .',
      newUser,
    });
  } catch (err) {
    next(err);
  }
};




//login
// localhost:8800/api/auth/login
export const login = async (req, res, next) => {
  try {
    console.log(req.body.username);
    console.log(req.body.password);

    // Find the user in the database by username
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "User not found!!!"));
    }

    // Check if the entered password matches the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return next(createError(404, "Password is wrong!!!"));
    }

    // Exclude the password and other sensitive information
    const { password, isAdmin, ...otherDetails } = user._doc;

    // Send back the user details and isAdmin flag (without token and cookie)
    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
