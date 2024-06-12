import { asyncHandler } from "../../../utils/errorHandling.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendEmail from "../../../utils/email.js";
import { resetPassword, signupTemp } from "../../../utils/generateHtml.js";
import tokenModel from "../../../../DB/model/Token.model.js";
import randomstring from "randomstring";
import userModel from "../../../../DB/model/User.model.js";
import famillyModel from "../../../../DB/model/famillyMember.js";
import mongoose from "mongoose";
import cloudinary from "../../../utils/cloudinary.js";


export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return next(new Error("email already registered !", { cause: 409 }));
  }

  const hashPassword = bcryptjs.hashSync(
    password,
    Number(process.env.SALT_ROUND)
  );
  const activationCode = crypto.randomBytes(64).toString("hex");

  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
    activationCode,
  });

  const link = `https://fast-plat1.vercel.app/auth/confirmEmail/${activationCode}`;

  const isSent = await sendEmail({
    to: email,
    subject: "Activate Account",
    html: signupTemp(link),
  });
  return isSent
    ? res
        .status(200)
        .json({ success: true, message: "Please review Your email!" })
    : next(new Error("something went wrong!", { cause: 400 }));
});
export const activationAccount = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { activationCode: req.params.activationCode },
    { isConfirmed: true, $unset: { activationCode: 1 } }
  );

  if (!user) {
    return next(new Error("User Not Found!", { cause: 404 }));
  }
  await famillyModel.create({ user: user._id });

  return res
    .status(200)
    .send("Congratulation, Your Account is now activated, try to login");
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new Error("Invalid-Email", { cause: 400 }));
  }

  if (!user.isConfirmed) {
    return next(new Error("Un activated Account", { cause: 400 }));
  }

  const match = bcryptjs.compareSync(password, user.password);

  if (!match) {
    return next(new Error("Invalid-Password", { cause: 400 }));
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SIGNATURE
  );

  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });

  user.status = "online";
  await user.save();

  return res.status(200).json({
    success: true,
    token,
    data: { userName: user.userName, profileImage: user.profileImage },
  });
});

//send forget Code

export const sendForgetCode = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new Error("Invalid email!", { cause: 400 }));
  }

  const code = randomstring.generate({
    length: 5,
    charset: "numeric",
  });

  user.forgetCode = code;
  await user.save();
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SIGNATURE
  );
  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });
  return (await sendEmail({
    to: user.email,
    subject: "Reset Password",
    html: resetPassword(code),
  }))
    ? res
        .status(200)
        .json({ success: true, message: "check you email!", token })
    : next(new Error("Something went wrong!", { cause: 400 }));
});

export const resetPasswordByCode = asyncHandler(async (req, res, next) => {
  const newPassword = bcryptjs.hashSync(
    req.body.password,
    +process.env.SALT_ROUND
  );
  const user = await userModel.findOneAndUpdate(
    { email: req.user.email },
    { password: newPassword }
  );

  //invalidate tokens
  const tokens = await tokenModel.find({ user: user._id });

  tokens.forEach(async (token) => {
    token.isValid = false;
    await token.save();
  });

  return res.status(200).json({ success: true, message: "Try to login!" });
});

export const VerifyCode = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.user.email });
  if (!user.forgetCode) {
    return next(new Error("go to resend forget code", { status: 400 }));
  }
  if (user.forgetCode !== req.body.forgetCode) {
    return next(new Error("Invalid code!", { status: 400 }));
  }
  await userModel.findOneAndUpdate(
    { email: req.user.email },
    { $unset: { forgetCode: 1 } }
  );

  return res
    .status(200)
    .json({ success: true, message: "go to reset new password" });
});

export const followUnFollowUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userToModify = await userModel.findById(id);
  const currentUser = await userModel.findById(req.user._id);
  if (id.toString() === req.user._id.toString()) {
    return next(
      new Error("You can't follow/unfollow yourself!", { cause: 400 })
    );
  }
  if (!userToModify || !currentUser) {
    return next(new Error("User not found!", { cause: 404 }));
  }
  const isFollowing = currentUser.following.includes(id);
  if (isFollowing) {
    //unfollow user
    await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { following: id },
    });
    await userModel.findByIdAndUpdate(id, {
      $pull: { followers: req.user._id },
    });
    return res
      .status(200)
      .json({ success: true, message: "User unfollowed successfully!" });
  } else {
    //follow user
    await userModel.findByIdAndUpdate(req.user._id, {
      $push: { following: id },
    });
    await userModel.findByIdAndUpdate(id, {
      $push: { followers: req.user._id },
    });
    return res
      .status(200)
      .json({ success: true, message: "User followed successfully!" });
  }
});

export const update = asyncHandler(async (req, res, next) => {
  const { name, email, password, userName, bio } = req.body;
  const userId = req.user._id;
  let user = await userModel.findById(userId);
  if (!user) {
    return next(new Error("User not found!", { cause: 404 }));
  }
  if (req.params.id.toString() !== userId.toString()) {
    return next(
      new Error("You cannot update other user's profile ", { cause: 401 })
    );
  }
  if (password) {
    const hashPassword = bcryptjs.hashSync(
      password,
      Number(process.env.SALT_ROUND)
    );
    user.password = hashPassword;
  }
  if (req.file) {
    if (
      user.profileImage.id ==
      "Screenshot_2024-04-27_093345-removebg-preview_t5oyup.png"
    ) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: `${process.env.FOLDER_CLOUDINARY}/user/${user._id}`,
        }
      );
      user.profileImage.url = secure_url;
      user.profileImage.id = public_id;
    } else {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        {
          public_id: user.profileImage.id,
        }
      );
      user.profileImage.url = secure_url;
    }
  }
  user.name = name || user.name;
  user.email = email || user.email;
  user.userName = userName || user.userName;
  user.bio = bio || user.bio;
  user = await user.save();
  await postModel.updateMany(
    { "replies.userId": userId },
    {
      $set: {
        "replies.$[reply].userName": user.userName,
        "replies.$[reply].profileImage": user.profileImage,
      },
    },
    { arrayFilters: [{ "reply.userId": userId }] }
  );
  const userUpdated = await userModel.findById(user._id).select("-password");
  return res
    .status(200)
    .json({ message: "profile updated successfully!", userUpdated });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const { query } = req.params;
  let user;
  if (mongoose.Types.ObjectId.isValid(query)) {
    user = await userModel
      .findOne({ _id: query })
      .select("-password -createdAt");
  } else {
    user = await userModel
      .findOne({
        userName: query,
      })
      .select("-password -createdAt");
  }
  if (!user) {
    return next(new Error("User not found!", { cause: 404 }));
  }
  return res.status(200).json({ success: true, user });
});

export const getSuggestedUsers = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const usersFollowedByYou = await userModel
    .findById(userId)
    .select("following");

  const users = await userModel.aggregate([
    {
      $match: {
        _id: { $ne: userId },
      },
    },
    {
      $sample: { size: 10 },
    },
  ]);
  const filteredUsers = users.filter(
    (user) => !usersFollowedByYou.following.includes(user._id)
  );
  const suggestedUsers = filteredUsers.slice(0, 4);

  suggestedUsers.forEach((user) => (user.password = null));

  res.status(200).json(suggestedUsers);
});

export const freezeAccount = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new Error("User not found!", { cause: 404 }));
  }
  user.isFrozen = !user.isFrozen;
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Account frozen successfully!" });
});
