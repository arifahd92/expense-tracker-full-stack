const express = require ('express');
const app = express ();
const cors = require ('cors');
// files import
const sequelize = require ('./db/connection');
const signupRouter = require ('./routes/signup');
const loginRouter = require ('./routes/login');
//************* */

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use (cors (corsOptions));
app.use (express.json ());
app.use (signupRouter);
app.use (loginRouter);
sequelize
  .sync ()
  .then (() => {
    app.listen (4000, err => {
      if (err) {
        console.log (err);
        return;
      }
      console.log ('listening at port 4000');
    });
  })
  .catch (err => {
    console.log (err);
  });
