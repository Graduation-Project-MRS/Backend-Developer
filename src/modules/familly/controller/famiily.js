import famillyModel from "../../../../DB/model/famillyMember.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const add = asyncHandler(async (req, res, next) => {
  const { adults, childeren } = req.body;

  const family = await famillyModel.create({
    user: req.user._id,
    adults,
    childeren,
  });

  return res.status(201).json({ success: true, family });
});
