import express from "express";
import auth from "../../middleware/auth.js";

import {
  createTip,
  getAllTips,
  deleteTip,
  updateTip,
} from "./tipController.js";
import * as validators from "./tipValidator.js";
import { validation } from "../../middleware/validation.js";
const router = express.Router();

router.post("/addNewTip", auth, validation(validators.tipSchema), createTip);
router.get("/getAllTips", auth, getAllTips);
router.delete("/deleteTip:id", auth, deleteTip);
router.put("/updateTip:id", auth, updateTip);

export default router;
