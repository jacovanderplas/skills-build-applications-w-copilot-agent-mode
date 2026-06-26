"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const teams = await Team_1.Team.find().sort({ name: 1 });
        res.status(200).json(teams);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const team = await Team_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
