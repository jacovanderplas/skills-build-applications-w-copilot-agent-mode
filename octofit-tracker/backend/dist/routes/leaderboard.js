"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await LeaderboardEntry_1.LeaderboardEntry.find().sort({ points: -1, user: 1 });
        res.status(200).json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const entry = await LeaderboardEntry_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
