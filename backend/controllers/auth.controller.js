import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

export const loginUser = (req, res) => {};

export const singUpUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password, gender, city, country } =
    req.body;

  if (
    [fullName, email, userName, password, gender].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields is required");
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User name or email is already exist");
  }

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

  let avtarUrl = "";

  if (gender === "male") {
    avtarUrl = boyProfilePic;
  } else {
    avtarUrl = girlProfilePic;
  }

  const newUser = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    avatar: avtarUrl,
    password,
    gender,
    city,
    country,
  });

  const createdUser = await User.findById(newUser.id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Someting went wrong while createing user");
  }

  return res.json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  );
});

export const logoutUser = (req, res) => {};
