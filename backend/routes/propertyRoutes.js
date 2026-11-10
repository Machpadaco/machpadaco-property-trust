const express = require('express');
const router = express.Router();
const controller = require('../controllers/propertyController');
router.post('/verify', controller.verifyPostcode);
router.post('/register', controller.registerProperty);
router.get('/all', controller.getAllProperties);
module.exports = router;