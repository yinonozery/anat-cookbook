const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = {
    login: async (req, res) => {
        const userLoggingIn = req.body;
        const dbUser = await User.findOne({ email: userLoggingIn.email });
        if (!dbUser)
            return res.json({
                message:
                    'כתובת הדואר האלקטרוני ו/או הסיסמה שציינת אינם נכונים.',
                success: false,
            });

        const isValidPassword = await bcrypt.compare(
            userLoggingIn.password,
            dbUser.password
        );
        if (!isValidPassword) {
            return res.json({
                message:
                    'כתובת הדואר האלקטרוני ו/או הסיסמה שציינת אינם נכונים.',
                success: false,
            });
        }
        const token = jwt.sign(
            {
                id: dbUser._id,
                username: dbUser.username,
                email: dbUser.email,
                isAdmin: dbUser.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXP_TIME }
        );
        if (!token) return res.json({ message: err });
        return res
            .cookie('token', token, {
                //maxAge: 2 * 60 * 60 * 1000,
                //httpOnly: true,
                secure: true,
                //secure: process.env.NODE_ENV === 'development' ? false : true, // Only use HTTPS
                //path: '/',
                sameSite: false,
                //sameSite: 'strict', // Only send cookie to this site
            })
            .status(200)
            .json({
                message: `${dbUser.username} התחברת בהצלחה, הינך מועבר לאתר`,
                success: true,
                userInfo: { username: dbUser.username, email: dbUser.email },
                token: 'Bearer ' + token,
            });
    },
    register: async (req, res) => {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.email = req.body.email.toLowerCase();

        await User.findOne({
            email: req.body.email,
        })
            .then((user) => {
                if (user !== null)
                    return res.status(501).send({
                        message: 'User already is system',
                        success: false,
                    });
                else {
                    User.create(req.body)
                        .then((text) => {
                            return res.status(201).send({
                                message: 'User registration is completed',
                                success: true,
                            });
                        })
                        .catch((error) => {
                            return res.status(500).send({
                                message:
                                    'Could not create a new user, try again',
                                success: false,
                            });
                        });
                }
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error,
                    success: false,
                });
            });
    },
    logout: async (req, res, next) => {
        res.clearCookie('token');
        res.send({ success: true });
    },
    profile: async (req, res, next) => {
        const token = req.cookies.token;
        const userInfo = jwt.decode(token);
        res.send({ message: 'Authorized', userInfo });
    },
};
