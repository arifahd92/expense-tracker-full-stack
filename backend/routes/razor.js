const express = require ('express');
const buyPremium = require ('../controllers/razor');
const {findId} = require ('../middleware/authenticate');
const router = express.Router ();
router.get ('/buy-premium', findId, buyPremium);
module.exports = router;
