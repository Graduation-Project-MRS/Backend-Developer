import ContactUs from '../../../DB/model/contactusModel.js';
import asyncHandler from 'express-async-handler';
import nodemailer from "nodemailer";

   //SMPT setting od nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

export const createContactus = asyncHandler(async (req, res, next) => {
    const { name, email, message } = req.body;
  
    // Save the contact message to the database
    const contactMessage = new ContactUs({
      name,
      email,
      message,
    });
  
    await contactMessage.save();
  
    // Send an email notification to the admin
    const mailOptions = {
      from: email,
      to: process.env.EMAIL, // Admin email address
      text: `You have received a new message from ${name} (${email}):\nMessage:\n${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  
    res.status(201).json({ message: 'Your message has been sent successfully.' });
  });