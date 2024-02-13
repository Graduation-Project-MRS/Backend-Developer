const express = require('express');
const router = express.Router();
const tipController = require('../controllers/tipController');
const authMiddleware = require('../middleware/authMiddleware');
const tipValidator = require('../validators/tipValidator');
const asyncHandler = require('express-async-handler');

router.post('/tip', authMiddleware.checkAdmin, tipValidator.validateTip, asyncHandler(tipController.createTip));
router.get('/tips', asyncHandler(tipController.getTips));

module.exports = router;
