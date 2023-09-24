const bcrypt = require ('bcrypt');
const Signup = require ('../models/signup');
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    console.log ('signup user');
    const {name, email, password} = req.body;
    const exists = await Signup.findOne ({where: {email}});

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
        });
        console.log (data);
        res.json ({message: 'Success'});
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
