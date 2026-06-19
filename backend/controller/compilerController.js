const Problem = require('../model/Problem');

const runCode = async (req, res) => {
    const { language, code, problemId } = req.body;

    if (!language || !code || !problemId) {
        return res.status(400).json({ message: "language, code and problemId are required" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
    }

    // get only visible test cases for Run
    const visibleTestCases = problem.testCases.filter(tc => !tc.isHidden);

    // TODO: send to Judge0 or your compiler service here
    // for now send back what was received so you can verify the flow works
    return res.status(200).json({
        output: `Received:\nLanguage: ${language}\nTest cases to run: ${visibleTestCases.length}\n\nCode:\n${code}`
    });
};

const submitCode = async (req, res) => {
    const { language, code, problemId } = req.body;

    if (!language || !code || !problemId) {
        return res.status(400).json({ message: "language, code and problemId are required" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
    }

    // get ALL test cases including hidden for Submit
    const allTestCases = problem.testCases;

    // TODO: send to Judge0 here, run against all test cases
    return res.status(200).json({
        output: `Received:\nLanguage: ${language}\nTest cases to run: ${allTestCases.length} (including hidden)\n\nCode:\n${code}`
    });
};

module.exports = { runCode, submitCode };