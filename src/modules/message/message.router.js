// routes/auth.js
import { Router } from "express";
import * as messageController from "./controller/message.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import auth from "../../middleware/auth.js";
const router = Router();
router.get(
  "/conversation",
  auth,
  messageController.getConversations
);
router.get("/:otherUserId", auth, messageController.getMessages);
router.post(
  "/send/:id",
  auth,
  fileUpload(filterObject.image).single("img"),
  messageController.sendMessage
);

export default router;
