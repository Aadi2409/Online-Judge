const express = require("express");
const router = express.Router();
const  verifyToken  = require("../middleware/verifyToken");
const { register, login, logout } = require("../controller/authController");


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/verify", verifyToken, (req, res) => {
    res.json({ message: "Authorized.", user: req.user });
});

// router.get('/profile', verifyToken, getProfile);
// router.get('/dashboard', verifyToken, getDashboard);


module.exports = router;