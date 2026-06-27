const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const submissionsDirectory = path.join(__dirname, "..", "workspace", "submissions");
if (!fs.existsSync(submissionsDirectory)) {
    fs.mkdirSync(submissionsDirectory, { recursive: true });
}

const generateFile = (language, code) => {
    const submissionId = uuidv4();
    const submissionFolder = path.join(submissionsDirectory, submissionId);
    
    // Create submission folder if it doesn't exist
    if (!fs.existsSync(submissionFolder)) {
        fs.mkdirSync(submissionFolder, { recursive: true });
    }
    
    const filename = `code.${language}`;
    const filepath = path.join(submissionFolder, filename);
    fs.writeFileSync(filepath, code);
    
    return { submissionId, filepath };
};

module.exports = { generateFile };