const express = require('express');

const router = express.Router();
const { protect } = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.use(protect);
// router
//   .route('/')
//   .get(conversationController.getConversationsByUser)
//   .post(conversationController.createConversation);

router.route('/me').get(userController.getUserInfo);
router.route('/me/friends').get(userController.getUserFriends);

// router.route('/:id').get(conversationController.getConversationDetails);
// //   .put(conversationController.updatePost)
//   .delete(conversationController.deletePost);

module.exports = router;
