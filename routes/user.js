const express = require('express');
const router = express.Router();
const userApi = require('../controllers/user');
router.post('/register', userApi.register);
router.post('/login', userApi.login);

module.exports = router;