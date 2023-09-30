// this will be used to verify user
// if user has token then we will  redirect user from sign up /login page to expense page directly by verifying

const jwt = require ('jsonwebtoken');

// m-post=> /verify-user
const verify = async (req, res) => {
  const {id, email} = req.body;
  const token = req.headers.authorization;
  console.log (req.headers);

  try {
    const decodedToken = jwt.verify (token, 'secretkey');
    const userEmail = decodedToken.email;
    const userId = decodedToken.id;
    if (userEmail != email || userId != id) {
      // token valid but payload didnt match (user changed manually in local storage)
      return res.json ({message: 'Token is invalid', verification: false});
    }
    return res.json ({message: 'Token is valid', verification: true});
  } catch (error) {
    // Token is invalid or expired
    console.log (error.message);
    res.status (401).json ({error: 'Unauthorized', verification: false});
  }
};
module.exports = {verify};
