import { trycatchmethod } from '../middleware/trycatchmethod.js';
import { UserModel } from '../model/User.js';
import { ErrorHandler } from '../util/ErrorHandler.js';
import { sendToken } from '../util/SendToken.js';
import { compare } from 'bcrypt';

export const Register = trycatchmethod(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

   
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
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
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    let user;
    if (usernameOrEmail.includes('@')) {
 
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

