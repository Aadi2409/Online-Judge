const AuthUser = require("../model/User");

const isAdmin = async (req, res, next) => {
    
        const user = await AuthUser.findById(req.user.id);
        if(!user || user.role !=="admin"){
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
};

module.exports = isAdmin;