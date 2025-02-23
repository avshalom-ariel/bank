const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const token = getTokenFromHeader(req.headers);  // Get the token from the cookies
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
