const moongoose = require('mongoose');

const testCaseSchema = new moongoose.Schema({
    problemId: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    }
});

const TestCase = moongoose.model('TestCase', testCaseSchema);

module.exports = TestCase;