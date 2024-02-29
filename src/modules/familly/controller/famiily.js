import famillyModel from "../../../../DB/model/famillyMember.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const addFamilyMember = asyncHandler(async (req, res, next) => {
  const { adults, babies, childeren } = req.body;

  const family = await famillyModel.create({
    adults,
    babies,
    childeren,
  });

  return res.status(201).json({ success: true, family });
});
