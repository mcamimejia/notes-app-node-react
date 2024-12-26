const jwt = require('jsonwebtoken');

exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
        } else {
            req.user = decodedUser;
            next();
        }
    });
};