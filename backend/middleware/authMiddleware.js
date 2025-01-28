const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        console.log("auth request received");

        const token = getTokenFromHeader(req.headers);  // Get the token from the cookies

        console.log("authentication token: " + token);

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded token: " + decoded);

        req.user = decoded;

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const getTokenFromHeader = (headers) => {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }

}

module.exports = authenticateToken;
