const axios = require ('axios');
//var SibApiV3Sdk = require('sib-api-v3-sdk');
const bcrypt = require ('bcrypt');
const User = require ('../models/user');
const jwt = require ('jsonwebtoken');
const saltRounds = 10;

const secretKey = process.env.JWT_TOKEN;

const generateToken = data => {
  try {
    console.log ({generateToken: data});
    const id = data.id;
    const email = data.email;
    const token = jwt.sign ({id, email, premium: false}, secretKey, {
      expiresIn: '112h',
    });
    return token;
  } catch (error) {
    console.log (error.message);
  }
};
const signup = async (req, res) => {
  try {
    console.log ('signup user');
    console.log (req.body);
    const {name, email, password} = req.body;

    exists = await User.findOne ({where: {email}});

    if (exists) {
      return res.status (409).json ({error: 'User already exists'});
    }

    // Hash the password
    bcrypt.hash (password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error (err);
        return res.status (500).json ({error: 'Password hashing failed'});
      }

      try {
        // Create the user with the hashed password
        const data = await User.create ({
          name,
          email,
          password: hashedPassword,
          premium: false,
          totalExpenseAmount: 0,
        });
        console.log ('im data');
        console.log (data.dataValues);
        const token = generateToken (data.dataValues);
        res.json ({
          message: 'Success',
          token,
          id: data.dataValues.id,
          premium: data.dataValues.premium,
        });
      } catch (error) {
        console.error (error);
        res
          .status (500)
          .json ({success: false, error: 'Internal Server Error'});
      }
    });
  } catch (error) {
    console.error (error);
    res.status (500).json ({success: false, error: 'Internal Server Error'});
  }
};
//m-post =>password/forgot-password

async function sendEmail({
  message = 'forgot password message',
  subject = 'recover password',
  to = 'random@gmail.com',
}) {
  try {
    const apiUrl = 'https://api.sendinblue.com/v3/smtp/email';

    const emailData = {
      sender: {name: 'md arif', email: 'arifahd92@gmail.com'},
      to: [{email: to}],
      subject,
      textContent: message,
    };

    const response = await axios.post (apiUrl, emailData, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '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',
      },
    });

    if (response.status === 201) {
      console.log ('Email sent successfully');
    } else {
      console.error ('Failed to send email:', response.data);
    }
  } catch (error) {
    console.error ('Error sending email:', error.message);
  }
}
const forgotPassword = async (req, res) => {
  try {
    const {email: to} = req.body;
    const user = await User.findOne ({where: {email: to}});
    if (user) {
      sendEmail ({
        to,
        message: 'it will be field',
        subject: 'it will also be field',
      });
    }
    if (!user) {
      return res.json ({message: 'you are not a registered user'});
    }
    res.send ({message: 'chec your email'});
  } catch (error) {
    res.json ({message: 'you are not a registered user from catch'});
  }
};
module.exports = {signup, forgotPassword};
