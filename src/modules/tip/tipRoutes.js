import express from 'express';
import { createTip, getAllTips } from './tipController.js';
import tipSchema from './tipValidator.js';
import { validation } from '../../middleware/validation.js';

const router = express.Router();

router.post('/', validation(tipSchema), createTip);
router.get('/', getAllTips);

export default router;
