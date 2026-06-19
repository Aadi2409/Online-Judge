const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { runCode, submitCode } = require('../controller/compilerController');

router.post("/run", verifyToken, runCode);
router.post("/submit", verifyToken, submitCode);

module.exports = router;