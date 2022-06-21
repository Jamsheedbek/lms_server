const { secret } = require('../config/auth.config');
const { sign, verify } = require('jsonwebtoken');

const signUser = (payload) => sign(payload, secret);
const verifyUser = (token) => verify(token, secret);

module.exports = {
    signUser,
    verifyUser,
};
