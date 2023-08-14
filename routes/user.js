const express = require('express');
const router = express.Router();
const userApi = require('../controllers/user');
router.get('/', userApi.register);
router.get('/login', userApi.login);

module.exports = router;