import { Router } from "express";
import * as famillyController from "./controller/famiily.js";
import auth from "../../middleware/auth.js";
const router = Router();

router.post("/addFamilyMember", auth, famillyController.addFamilyMember);

export default router;
