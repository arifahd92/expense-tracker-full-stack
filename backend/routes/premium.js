const {leaderboard} = require ('../controllers/premium');
const {findId} = require ('../middleware/authenticate');

const router = require ('express').Router ();
//for premium user only
router.get ('/premium/leader-board', findId, leaderboard);
module.exports = router;
