const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`${req.method}=> ${req.originalUrl}`);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
module.exports = auth;