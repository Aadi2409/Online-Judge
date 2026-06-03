const mongoose  = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    example: {
        input: String,
        output: String
    },
    tags: [String],
    timeLimit: {    
        type: Number,
        default: 1000 // in milliseconds
    },
    memoryLimit: {
        type: Number,
        default: 256 // in MB
    }

});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;