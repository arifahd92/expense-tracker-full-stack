const express = require ('express');
const jwt = require ('jsonwebtoken');
const router = express.Router ();
const verify = async (req, res) => {
  const {id, email} = req.body;

  const authHeader = req.headers['authorization'];

  // Check if the Authorization header exists and has the Bearer format
  if (!authHeader || !authHeader.startsWith ('Bearer ')) {
    return res.status (401).json ({error: 'Unauthorized', verification: false});
  }

  // Extract the token from the Authorization header
  const token = authHeader.split (' ')[1];

  try {
    // Verify and decode the token using your secret key
    const decodedToken = jwt.verify (token, 'secretkey'); // Replace 'secretkey' with your actual secret key

    // Now, you can access the decoded token payload
    const userEmail = decodedToken.email;
    const userId = decodedToken.id;
    if (userEmail != email || userId != id) {
      // token valid but payload didnt match (user changed manually)
      return res.json ({message: 'Token is invalid', verification: false});
    }
    return res.json ({message: 'Token is valid', verification: true});
  } catch (error) {
    // Token is invalid or expired
    console.log (error.message);
    res.status (401).json ({error: 'Unauthorized', verification: false});
  }
};
router.post ('/verify-user', verify);
module.exports = router;
