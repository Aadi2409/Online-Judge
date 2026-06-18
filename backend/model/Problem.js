const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String },
});

const testCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isHidden: { type: Boolean, default: false }, // hidden test cases for grading
});

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: [{ type: String }],
    constraints: [{ type: String }],
    examples: [exampleSchema],
    testCases: [testCaseSchema],
    starterCode: {
        javascript: { type: String, default: "" },
        python: { type: String, default: "" },
        cpp: { type: String, default: "" },
        java: { type: String, default: "" },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuthUser",
    },
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);