const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
} = require('../controller/problemController');

// Public — anyone logged in can view problems
router.get("/", verifyToken, getAllProblems);
router.get("/:id", verifyToken, getProblemById);

// Restricted — only logged in users can create/edit/delete
// (later you can add an isAdmin check here too)
router.post("/", verifyToken, isAdmin, createProblem);
router.put("/:id", verifyToken, isAdmin, updateProblem);
router.delete("/:id", verifyToken, isAdmin, deleteProblem);

module.exports = router;