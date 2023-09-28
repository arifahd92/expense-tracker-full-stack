const jwt = require ('jsonwebtoken');
const secretKey = process.env.JWT_TOKEN;
const findId = (req, res, next) => {
  try {
    console.log ('find id middleware inside authenticate');
    const token = req.headers.authorization;
    const decodeToken = jwt.verify (token, secretKey);
    console.log ({decodeToken});
    req.userId = decodeToken.id;
    req.userEmail = decodeToken.email;
    next ();
  } catch (error) {
    console.log (error.message);
    res.status (401).json ({error: 'Unauthorized', verification: false});
  }
};
module.exports = {findId};
