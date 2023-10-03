const {ForgotPassword} = require ('../models/password');
const User = require ('../models/user');
const sendinBlueApiKey = process.env.API_KEY;
const axios = require ('axios');
const saltRounds = 10;
const bcrypt = require ('bcrypt');
//update password***************
const updatePassword = async (req, res) => {
  try {
    const {password, cnfPassword, reqId} = req.body;
    console.log (password, cnfPassword, reqId);
    const passwordData = await ForgotPassword.findByPk (reqId);
    const userId = passwordData.userId;
    const isActive = passwordData.isActive;
    if (isActive) {
      bcrypt.hash (password, saltRounds, async (err, hashedPassword) => {
        if (err) {
          console.error (err);
          return res.status (500).json ({error: 'Password hashing failed'});
        }

        const [usercount] = await User.update (
          {password: hashedPassword},
          {where: {id: userId}}
        );
        const [passwordcount] = await ForgotPassword.update (
          {
            isActive: false,
          },
          {where: {userId}}
        );
        if (usercount != 0 && passwordcount != 0) {
          return res.send ({message: 'success'});
        }
        return res.send ({message: 'failed'});
      });
    }
    return res.send ({message: 'link expired'});
  } catch (error) {
    console.log (error);
    res.send ({message: 'internal server error'});
  }
};

// general function to send email via Sendinblue
async function sendEmail({message, subject, to}) {
  try {
    const apiUrl = 'https://api.sendinblue.com/v3/smtp/email';

    const emailData = {
      sender: {name: 'md arif', email: 'mdarif7312@gmail.com'},
      to: [{email: to}],
      subject,
      textContent: message,
    };

    const response = await axios.post (apiUrl, emailData, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': sendinBlueApiKey,
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

//m-post=>password/forgot-password
//send a link to user to reset password
const forgotPassword = async (req, res) => {
  try {
    const {email: to} = req.body;
    const user = await User.findOne ({where: {email: to}});
    const forgotPassword = await ForgotPassword.create ({
      isActive: true,
      userId: user.id,
    });
    // console.log (forgotPassword);
    const requestId = forgotPassword.id;
    //console.log ({to});
    console.log ('visit at ');
    if (user && forgotPassword) {
      console.log (
        `http://localhost:3000/password/reset-password/${requestId}`
      );
      /*  sendEmail ({
        to,
        message: `http://localhost:3000/password/reset-password/${requestId}`,
        subject: 'ressetting password',
      });
      */
    }
    if (!user) {
      return res.json ({message: 'you are not a registered user'});
    }
    res.send ({message: 'chec your email', requestId: requestId});
  } catch (error) {
    console.log (error.message);
    res.json ({message: 'you are not a registered user from catch'});
  }
};
module.exports = {updatePassword, forgotPassword};