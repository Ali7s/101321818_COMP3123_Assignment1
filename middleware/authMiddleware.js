const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const authenticateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("Authorization Header:", authHeader);

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('User is not authorized');
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error('Token not found');
    }
});

module.exports = authenticateToken;
