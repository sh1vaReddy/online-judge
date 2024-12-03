import jsonwebtoken from "jsonwebtoken";

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000, 
    sameSite: "None",
    httpOnly: true, 
    secure:true, 
};

const sendToken = (res, user, code, message) => {
    const token = jsonwebtoken.sign(
        { _id: user._id,
            role: user.role,
         },
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
