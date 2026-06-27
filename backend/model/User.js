const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        solvedProblems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Problems",
            },
        ],

        submissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Submission",
            },
        ],

        rating: {
            type: Number,
            default: 0,
        },

        rank: {
            type: Number,
            default: 0,
        },

        streak: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
