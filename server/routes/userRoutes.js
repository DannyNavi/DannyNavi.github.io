const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');

const router = express.Router();
const { getAllUsers } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', authUser);

router.get('/', getAllUsers); // GET /api/users

module.exports = router;
