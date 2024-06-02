import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const getAllUser = asyncHandler(async (req, res) => {
  const loggedInUsersId = req.user._id;

  const filterdUsers = await User.find({
    _id: {
      $ne: loggedInUsersId,
    },
  }).select("-password");

  return res.json(
    new ApiResponse(200, filterdUsers, "User succesfully fetch!")
  );
});
