import jsonwebtoken from "jsonwebtoken";

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "None", // Important for cross-site cookies
    httpOnly: true, // Prevents client-side JS access to the cookie
    secure: process.env.NODE_ENV === 'production', // Only set secure cookie in production
};

const sendToken = (res, user, code, message) => {
    const token = jsonwebtoken.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } 
    );

    return res.status(code).cookie("token", token, cookieOptions).json({
        success: true,
        token,
        message,
        user,
    });
};

export { sendToken, cookieOptions };
