const Submission = require('../model/Submission');
const AuthUser   = require('../model/User');

const getUserStats = async (req, res) => {
    try {
        const userId = req.user.id; // from verifyToken middleware

        // ── 1. PROBLEMS SOLVED ──────────────────────────────────────────
        // count unique problems where this user got at least one Accepted
        const solvedProblems = await Submission.distinct('problemId', {
            userId,
            verdict: 'Accepted',
        });
        const problemsSolved = solvedProblems.length;

        // ── 2. STREAK ───────────────────────────────────────────────────
        // get all dates the user made ANY submission, sorted descending
        const allSubmissions = await Submission.find({ userId })
            .select('createdAt')
            .sort({ createdAt: -1 });

        const streak = calculateStreak(allSubmissions);

        // ── 3. RANK ─────────────────────────────────────────────────────
        // rank = how many users have solved MORE problems than this user + 1
        // we count distinct accepted problems per user across all users
        const allUserSolvedCounts = await Submission.aggregate([
            { $match: { verdict: 'Accepted' } },
            // get unique problemId per userId
            { $group: { _id: { userId: '$userId', problemId: '$problemId' } } },
            // count how many unique problems each user solved
            { $group: { _id: '$_id.userId', solved: { $sum: 1 } } },
        ]);

        // count how many users solved MORE than current user
        const usersAhead = allUserSolvedCounts.filter(
            (u) => u.solved > problemsSolved
        ).length;

        const rank = usersAhead + 1; // rank starts at 1

        // ── 4. ACCURACY ─────────────────────────────────────────────────
        // accuracy = (total test cases passed across all submissions) /
        //            (total test cases across all submissions) * 100
        const accuracyData = await Submission.aggregate([
            { $match: { userId: new require('mongoose').Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalPassed: { $sum: '$testCasesPassed' },
                    totalCases:  { $sum: '$totalTestCases' },
                },
            },
        ]);

        let accuracy = 0;
        if (accuracyData.length > 0 && accuracyData[0].totalCases > 0) {
            accuracy = Math.round(
                (accuracyData[0].totalPassed / accuracyData[0].totalCases) * 100
            );
        }

        return res.status(200).json({
            problemsSolved,
            streak,
            rank,
            accuracy,
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ── STREAK HELPER ────────────────────────────────────────────────────────────
// Counts how many consecutive days (ending today or yesterday) the user submitted
const calculateStreak = (submissions) => {
    if (!submissions.length) return 0;

    // get unique submission dates as YYYY-MM-DD strings
    const uniqueDates = [
        ...new Set(
            submissions.map((s) =>
                new Date(s.createdAt).toISOString().split('T')[0]
            )
        ),
    ].sort((a, b) => (a > b ? -1 : 1)); // sort descending (newest first)

    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // streak only counts if user submitted today or yesterday
    // (if last submission was 2+ days ago, streak is 0)
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
        return 0;
    }

    let streak = 1;

    for (let i = 0; i < uniqueDates.length - 1; i++) {
        const current  = new Date(uniqueDates[i]);
        const previous = new Date(uniqueDates[i + 1]);

        // check if consecutive days (1 day apart)
        const diffDays = Math.round(
            (current - previous) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            streak++;
        } else {
            // gap found — stop counting
            break;
        }
    }

    return streak;
};

module.exports = { getUserStats };
