const { spawn } = require("child_process");

const executeJavaScript = (filepath, input, submissionId) => {
    return new Promise((resolve, reject) => {
        const child = spawn("node", [filepath], {
            stdio: ["pipe", "pipe", "pipe"],
        });

        let stdout = "";
        let stderr = "";

        child.stdout.on("data", (chunk) => {
            stdout += chunk.toString();
        });

        child.stderr.on("data", (chunk) => {
            stderr += chunk.toString();
        });

        child.on("error", (error) => {
            reject({ error: error.message, stderr });
        });

        child.on("close", (code) => {
            if (code !== 0) {
                reject({ error: `Process exited with code ${code}`, stderr });
                return;
            }

            resolve(stdout);
        });

        if (input !== undefined && input !== null) {
            child.stdin.write(input);
        }
        child.stdin.end();
    });
};

module.exports = executeJavaScript;
