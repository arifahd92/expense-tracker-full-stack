const bcrypt = require ('bcrypt');

const Signup = require ('../models/signup');

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log (req.body);
    const exists = await Signup.findOne ({where: {email}});

    if (!exists) {
      return res.status (404).json ({error: 'user not found'});
    }
    if (exists) {
      console.log (exists.password == password);
      bcrypt.compare (password, exists.password, (err, result) => {
        if (err) {
          //internal error of bcrypt
          console.log (err);
          return res
            .status (500)
            .json ({message: 'password decryption failed, try again '});
        }
        if (!!result) {
          // password matched
          console.log (result);
          return res.send ({message: 'success'});
        }
        if (!result) {
          return res.status (401).json ({error: 'unthorized access'});
        }
      });
    }
  } catch (error) {
    console.log (error);
    res.status (500).json ({error: 'Internal server error backend'});
  }
};
module.exports = {login};
