import { Router } from "express";
import * as postController from "./post.js";
// import postValidation from "./post.validation.js";
// import { isValidation } from "../../middleware/validation.middleware.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import auth from "../../middleware/auth.js";
const router = Router();

router.post(
  "/create",
  auth,
  fileUpload(filterObject.image).single("img"),
  postController.createPost
);
router.get("/feed", auth, postController.getFeedPosts);
router.get("/:id", postController.getPost);
router.get("/user/:userName", postController.getUserPosts);
router.delete("/:id", auth, postController.deletePost);
router.put("/like/:id", auth, postController.likeUnLikePost);
router.put("/reply/:id", auth, postController.replyToPost);

export default router;
