const db = require('../models');
const { secret } = require('../config/auth.config');
const User = db.users;
var bcrypt = require('bcryptjs');
var { signUser, verifyUser } = require('../utils/jwt');

module.exports = {
    signUp: async (req, res) => {
        try {
            const { fname, lname, email, password } = req.body;
            const user = await User.create({
                firstname: fname,
                lastname: lname,
                email: email,
                password: bcrypt.hashSync(password, 8),
            });
            res.status(201).send({
                accessToken: signUser({
                    id: user.id,
                    role: user.role,
                }),
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    signIn: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(404).send({ message: 'User not found.' });
            }
            var passswordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passswordIsValid) {
                res.status(401).send({
                    token: null,
                    message: 'Invalid Password',
                });
            }

            res.status(200).send({
                accessToken: signUser({
                    id: user.id,
                    role: user.role,
                }),
            });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
};
