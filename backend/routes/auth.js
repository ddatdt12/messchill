const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.get('/google', authController.googleAuthenticate);
router.get('/', protect, authController.authenticate);
router.get('/logout', protect, authController.logout);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/login/google', authController.mobileGoogleLogin);
router.post('/loginGoogle', authController.googleLogin);

module.exports = router;
