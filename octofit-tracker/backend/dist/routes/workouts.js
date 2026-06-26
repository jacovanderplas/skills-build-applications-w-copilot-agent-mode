"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ difficulty: 1, title: 1 });
        res.status(200).json(workouts);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
