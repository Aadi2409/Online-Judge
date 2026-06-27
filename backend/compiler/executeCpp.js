const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputDir = path.join(__dirname, "..", "workspace", "submissions");

const executeCpp = (filepath, input, submissionId) => {
    const exeFilePath = path.join(outputDir, submissionId, "code.exe");
    const inputFilePath = path.join(outputDir, submissionId, "input.txt");

    // FIX 1 — write input to a file so \n is a real newline, not literal text
    fs.writeFileSync(inputFilePath, input);

    return new Promise((resolve, reject) => {
        // FIX 2 — compile first, then run separately using input redirection from file
        const compileCmd = `g++ "${filepath}" -o "${exeFilePath}"`;
        
        exec(compileCmd, (compileError, _, compileStderr) => {
            if (compileError) {
                reject({ error: "Compilation Error", stderr: compileStderr });
                return;
            }

            // FIX 3 — use < to redirect the input file into the exe instead of echo
            const runCmd = `"${exeFilePath}" < "${inputFilePath}"`;

            exec(runCmd, { timeout: 5000 }, (runError, stdout, runStderr) => {
                if (runError) {
                    if (runError.killed) {
                        reject({ error: "Time Limit Exceeded", stderr: "" });
                    } else {
                        reject({ error: "Runtime Error", stderr: runStderr });
                    }
                    return;
                }
                resolve(stdout.trim());
            });
        });
    });
};

module.exports = executeCpp;