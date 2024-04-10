import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { generateAccessAndRefereshTokens } from "../services/auth.services.js";

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

export const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;
  if ((!userName || !email) && !password) {
    throw new ApiError(400, "User name or Email and password is required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User dose not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect password");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refereshToken"
  );
  const option = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option) // corrected typo "refereshToken" to "refreshToken"
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshToken, // corrected typo "refereshToken" to "refreshToken"
        },
        "User logged In Successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refereshToken: 1,
      },
    },
    { new: true }
  );

  const option = { httpOnly: true, secure: true };

  return res
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged out"));
});
