const express = require('express');

const router = express.Router();
const { protect } = require('../middlewares/auth');
const conversationController = require('../controllers/conversationController');

router.use(protect);
router
  .route('/')
  .get(conversationController.getConversationsByUser)
  .post(conversationController.createConversation);

router.route('/:id').get(conversationController.getConversationDetails);
//   .put(conversationController.updatePost)
//   .delete(conversationController.deletePost);

module.exports = router;
