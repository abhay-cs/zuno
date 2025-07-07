const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

module.exports = function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log('🔐 Received auth header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('⛔ No token provided');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        console.log('✅ Token valid, userId:', req.userId);
        next();
    } catch (err) {
        console.log('❌ Invalid token', err.message);
        return res.status(403).json({ error: 'Forbidden' });
    }
};


// 
