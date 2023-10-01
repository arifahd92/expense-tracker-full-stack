const bcrypt = require ('bcrypt');
const Signup = require ('../models/signup');
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

    exists = await Signup.findOne ({where: {email}});

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
        const data = await Signup.create ({
          name,
          email,
          password: hashedPassword,
          premium: false,
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

module.exports = {signup};
