const Signup = require ('../models/signup');

const signup = async (req, res) => {
  try {
    console.log ('signup user');
    const {name, email, password} = req.body;
    const exists = await Signup.findOne ({where: {email}});
    console.log (exists);
    if (!!exists) {
      return res.status (409).json ({error: 'User already exists'});
    }
    const user = new Signup ({
      name,
      email,
      password,
    });
    const data = await user.save ();
    res.send (data);
  } catch (error) {
    res.send ({success: false, error: 'Internal Server Error'});
  }
};
module.exports = {signup};
