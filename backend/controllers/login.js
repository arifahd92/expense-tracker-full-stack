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
      if (exists.password !== password) {
        return res.status (401).json ({error: 'unthorized access'});
      }
      console.log ('sending data');
      return res.send (exists);
    }
  } catch (error) {
    console.log (error);
    res.status (500).json ({error: 'Internal server error backend'});
  }
};
module.exports = {login};
