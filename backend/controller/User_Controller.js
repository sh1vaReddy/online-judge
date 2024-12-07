import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { UserModel } from "../model/User.js";
import { ErrorHandler } from "../util/ErrorHandler.js";
import { cookieOptions, sendToken } from "../util/SendToken.js";
import { compare } from "bcrypt";

export const Register = trycatchmethod(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email already registered", 409));
  }

  const user = await UserModel.create({
    username,
    email,
    password,
  });

  return sendToken(res, user, 201, "User Created");
});

export const Login = trycatchmethod(async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  let user;
  if (usernameOrEmail.includes("@")) {
    user = await UserModel.findOne({ email: usernameOrEmail });
  } else {
    user = await UserModel.findOne({ username: usernameOrEmail });
  }

  if (!user) {
    return next(new ErrorHandler("Invalid Username or Password", 404));
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Username or Password", 404));
  }

  return sendToken(res, user, 200, "Login Success");
});

export const getmyprofile = trycatchmethod(async(req,res,next) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  return res.status(200).json({
    sucess: true,
    data: user,
  });
});

export const logout=trycatchmethod(async(req,res)=>
{
    return res.status(200).cookie("token"," ",{...cookieOptions,maxAge:0}).json({
        sucess:true,
        message:"Logged out successfully",
    })
})


export const getallusers=trycatchmethod(async(req,res)=>
{
  const user=await UserModel.find();

  res.status(200).json({
    sucess:true,
    message:"All users",
    user
  })
})