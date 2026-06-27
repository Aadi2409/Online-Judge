const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ['javascript', 'python', 'cpp', 'java'],
    },
    verdict: {
        type: String,
        enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error'],
        default: 'Pending'
    },
    // ADDED — needed for accuracy calculation
    testCasesPassed: {
        type: Number,
        default: 0
    },
    totalTestCases: {
        type: Number,
        default: 0
    },
    executionTime: {
        type: Number,
        default: 0 // in milliseconds
    },
    memoryUsed: {
        type: Number,
        default: 0 // in MB
    }
// ADDED — timestamps gives us createdAt which is needed for streak calculation
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
