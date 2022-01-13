const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, authController.authenticate);
router.get('/logout', protect, authController.logout);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
