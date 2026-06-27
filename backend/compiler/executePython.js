const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputDir = path.join(__dirname, "..", "workspace", "submissions");

const executePython = (filepath, input, submissionId) => {
    const submissionDir = path.join(outputDir, submissionId);
    const inputFilePath = path.join(submissionDir, "input.txt");

    // ensure folder exists
    if (!fs.existsSync(submissionDir)) {
        fs.mkdirSync(submissionDir, { recursive: true });
    }

    // strip \r so Windows line endings don't corrupt input() reads
    fs.writeFileSync(inputFilePath, input.replace(/\r/g, ""));

    // Python has no compilation step — run directly
    // python3 on Linux/Mac, python on Windows — we try python3 first
    const pythonCmd = process.platform === "win32" ? "python" : "python3";

    return new Promise((resolve, reject) => {
        // redirect input file into python script
        const runCmd = `${pythonCmd} "${filepath}" < "${inputFilePath}"`;

        exec(runCmd, { timeout: 10000 }, (runError, stdout, runStderr) => {
            if (runError) {
                if (runError.killed) {
                    reject({ error: "Time Limit Exceeded", stderr: "" });
                } else {
                    // Python errors come in stderr — send them back as useful info
                    reject({ error: "Runtime Error", stderr: runStderr });
                }
                return;
            }

            // strip \r from output before returning
            resolve(stdout.replace(/\r/g, "").trim());
        });
    });
};

module.exports = executePython;
