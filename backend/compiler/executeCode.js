const executeCpp = require("./executeCpp");
const executeJava = require("./executeJava");
const executePython = require("./executePython");
const executeJavaScript = require("./executeJavaScript");

async function executeCode(language, filepath, testCasesOrInput, submissionId) {
    // Determine if input is test cases (array) or custom input (string)
    const isTestCases = Array.isArray(testCasesOrInput);
    
    // Prepare inputs to execute against
    let inputsToRun;
    if (isTestCases) {
        // Extract input from each test case object
        inputsToRun = testCasesOrInput.map(tc => tc.input);
    } else if (testCasesOrInput) {
        // Single custom input string
        inputsToRun = [testCasesOrInput];
    } else {
        // No input provided
        inputsToRun = [''];
    }

    // Execute code against each input
    const results = [];
    for (const input of inputsToRun) {
        let result;
        try {
            switch (language) {
                case "javascript":
                    result = await executeJavaScript(filepath, input, submissionId);
                    break;

                case "cpp":
                    result = await executeCpp(filepath, input, submissionId);
                    break;

                case "java":
                    result = await executeJava(filepath, input, submissionId);
                    break;

                case "python":
                    result = await executePython(filepath, input, submissionId);
                    break;

                default:
                    result = `Error: Language '${language}' is not supported`;
            }
        } catch (error) {
            result = `Error: ${error.error?.message || error.stderr || error}`;
        }
        results.push(result);
    }

    // Return single result for custom input, array for test cases
    return isTestCases ? results : results[0];
}

module.exports = executeCode;