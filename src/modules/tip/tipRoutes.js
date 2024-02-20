import express from 'express';
import { createTip, getAllTips, deleteTip, updateTip } from './tipController.js';
import {validate} from '../../middleware/tipValidate.js';
import tipValidator from './tipValidator.js';

const router = express.Router();

router.post('/addNewTip', validate(tipValidator), createTip);
router.get('/getAllTips', getAllTips);
router.delete('/deleteTip:id', deleteTip);
router.put('/updateTip:id', updateTip);

export default router;
