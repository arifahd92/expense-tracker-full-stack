const {leaderboard} = require ('../controllers/user');
const {findId} = require ('../middleware/authenticate');

const router = require ('express').Router ();
router.get ('/leader-board', findId, leaderboard);
module.exports = router;
