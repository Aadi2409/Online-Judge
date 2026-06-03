const moongose = require('mongoose');

const submissionSchema = new moongose.Schema({
    userId: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'],
        default: 'Pending'
    },
    executionTime: {
        type: Number,
        default: 0 // in milliseconds
    },
    memoryUsed: {
        type: Number,
        default: 0 // in MB
    }
});

const Submission = moongose.model('Submission', submissionSchema);

module.exports = Submission;