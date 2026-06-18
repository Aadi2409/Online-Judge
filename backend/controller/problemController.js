const Problem = require('../model/Problem');

// CREATE — Add a new problem
const createProblem = async (req, res) => {
    try {
        const { title, description, difficulty, category, tags, constraints, examples, testCases, starterCode } = req.body;

        if (!title || !description || !difficulty || !category) {
            return res.status(400).json({ message: "Title, description, difficulty, and category are required" });
        }

        const existing = await Problem.findOne({ title });
        if (existing) {
            return res.status(400).json({ message: "Problem with this title already exists" });
        }

        const newProblem = await Problem.create({
            title,
            description,
            difficulty,
            category,
            tags,
            constraints,
            examples,
            testCases,
            starterCode,
            createdBy: req.user.id, // from verifyToken middleware
        });

        return res.status(201).json({ message: "Problem created successfully", problem: newProblem });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// READ — Get all problems (list view, no test cases exposed)
const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .select("title difficulty category tags createdAt") // hide heavy fields
            .sort({ createdAt: -1 });

        return res.status(200).json({ problems });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// READ — Get single problem by ID (detail view, hide hidden test cases)
const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        // strip hidden test cases before sending to client
        const visibleProblem = problem.toObject();
        visibleProblem.testCases = visibleProblem.testCases.filter(tc => !tc.isHidden);

        return res.status(200).json({ problem: visibleProblem });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE — Edit a problem
const updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        const updated = await Problem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Problem updated successfully", problem: updated });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// DELETE — Remove a problem
const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        await Problem.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Problem deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
};