const Problem = require('../model/Problem');
const { generateFile } = require('../compiler/generateFile');
const executeCode = require('../compiler/executeCode');
const fs = require('fs');
const path = require('path');

// Function to delete submission folder after delay
const scheduleSubmissionDeletion = (submissionId, delayMs = 15 * 60 * 1000) => {
    setTimeout(() => {
        const submissionPath = path.join(__dirname, '..', 'workspace', 'submissions', submissionId);
        try {
            if (fs.existsSync(submissionPath)) {
                fs.rmSync(submissionPath, { recursive: true, force: true });
                console.log(`Deleted submission folder: ${submissionId}`);
            }
        } catch (error) {
            console.error(`Error deleting submission folder ${submissionId}:`, error.message);
        }
    }, delayMs);
};

const runCode = async (req, res) => {
    const { language, code, problemId, customInput, useCustomInput } = req.body;

    // if custom input is toggled, use that instead of problem test cases
    if (useCustomInput) {
        const {submissionId, filepath} =  generateFile(language, code);
        const codeOutput = await executeCode(language, filepath, customInput, submissionId);
        console.log(codeOutput);
        scheduleSubmissionDeletion(submissionId);
        return res.status(200).json({
             filepath,
             output: codeOutput
        });
    }

    // otherwise run against visible test cases as normal
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const visibleTestCases = problem.testCases.filter(tc => !tc.isHidden);

    const {submissionId, filepath} = generateFile(language, code);
    const codeOutput = await executeCode(language, filepath, visibleTestCases, submissionId);
    
    // Schedule deletion of submission folder after 15 minutes
    scheduleSubmissionDeletion(submissionId);
    
    // Format output for multiple test cases
    let formattedOutput;
    if (Array.isArray(codeOutput)) {
        formattedOutput = codeOutput.map((output, index) => `Test Case ${index + 1}:\n${output}`).join('\n---\n');
    } else {
        formattedOutput = codeOutput;
    }
    
    return res.status(200).json({
        filepath,
        output: formattedOutput
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

    const {submissionId, filepath} = generateFile(language, code);
    
    // Schedule deletion of submission folder after 15 minutes
    scheduleSubmissionDeletion(submissionId);

    // TODO: send to Judge0 here, run against all test cases
    return res.status(200).json({
        submissionId,
        output: `Received:\nLanguage: ${language}\nTest cases to run: ${allTestCases.length} (including hidden)\n\nCode:\n${code}`
    });
};

module.exports = { runCode, submitCode };
