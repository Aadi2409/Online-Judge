const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //console.log("Cookies", req.cookies); // Debug: log incoming cookies
    const token = req.cookies.token; // read from cookie, not headers

    if (!token) {
        return res.status(401).json({ message: "Access denied. Not logged in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, email, username }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = verifyToken;