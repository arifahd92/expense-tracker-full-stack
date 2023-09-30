const Order = require ('../models/order');
const Razorpay = require ('razorpay');
//m-get=> buy-premium
const buyPremium = async (req, res, next) => {
  try {
    console.log ('razors buy premium');
    const rzp = new Razorpay ({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });
    const amount = 3900;

    const createOrder = () => {//returning a promise
      return new Promise ((resolve, reject) => {
        rzp.orders.create ({amount, currency: 'INR'}, (err, order) => {
          if (err) {
            reject (err);
          } else {
            resolve (order);
          }
        });
      });
    };
    const order = await createOrder ();// this is inside async function thats why await

    // Create a Premium record and handle errors
    await Order.create ({
      orderid: order.id,
      status: 'PENDING',
      userId: req.userId,
    });

    res.status (201).json ({order, key_id: rzp.key_id});
  } catch (err) {
    console.error (err);
    res
      .status (403)
      .json ({message: 'Something went wrong', error: err.message});
  }
};
module.exports = buyPremium;
