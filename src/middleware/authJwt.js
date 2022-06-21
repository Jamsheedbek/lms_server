const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');
const db = require('../models');
const User = db.users;

const verifyToken = (req, res, next) => {
    let token = req.headers['token'];
    if (!token) {
        return res.status(403).send({
            message: 'No token provided!',
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unathorized!',
            });
        }
        req.userId = decoded.id;
        next();
    });
};
