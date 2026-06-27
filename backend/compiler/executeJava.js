const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputDir = path.join(__dirname, "..", "workspace", "submissions");

const executeJava = (filepath, input, submissionId) => {
    const submissionDir = path.join(outputDir, submissionId);
    const inputFilePath = path.join(submissionDir, "input.txt");

    // Java requires the filename to match the class name — must be Main.java
    const javaFilePath = path.join(submissionDir, "Main.java");

    // ensure folder exists
    if (!fs.existsSync(submissionDir)) {
        fs.mkdirSync(submissionDir, { recursive: true });
    }

    // strip \r so Windows line endings don't corrupt Scanner reads
    fs.writeFileSync(inputFilePath, input.replace(/\r/g, ""));

    // copy the code file as Main.java into the submission folder
    // (filepath is the original temp file, we need it named Main.java for javac)
    const code = fs.readFileSync(filepath, "utf8");
    fs.writeFileSync(javaFilePath, code);

    // delete old compiled .class files so stale bytecode never runs
    const classFile = path.join(submissionDir, "Main.class");
    if (fs.existsSync(classFile)) {
        fs.unlinkSync(classFile);
    }

    return new Promise((resolve, reject) => {
        // step 1 — compile with javac
        const compileCmd = `javac "${javaFilePath}"`;

        exec(compileCmd, (compileError, _, compileStderr) => {
            if (compileError) {
                reject({ error: "Compilation Error", stderr: compileStderr });
                return;
            }

            // step 2 — run the compiled class
            // -cp sets classpath to the submission folder so java finds Main.class
            const runCmd = `java -cp "${submissionDir}" Main < "${inputFilePath}"`;

            exec(runCmd, { timeout: 10000 }, (runError, stdout, runStderr) => {
                if (runError) {
                    if (runError.killed) {
                        reject({ error: "Time Limit Exceeded", stderr: "" });
                    } else {
                        reject({ error: "Runtime Error", stderr: runStderr });
                    }
                    return;
                }

                // strip \r from output before returning
                resolve(stdout.replace(/\r/g, "").trim());
            });
        });
    });
};

module.exports = executeJava;
