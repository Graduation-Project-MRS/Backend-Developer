import express from "express";

import { validation } from "../../middleware/validation.js";
import {createContactus} from "./contactusController.js"
import {contactValidator} from "./contactValidator.js"

const router = express.Router();

router.post("/", validation(contactValidator), createContactus);


export default router;