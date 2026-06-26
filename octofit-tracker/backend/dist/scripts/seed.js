"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const users = [
    {
        username: 'alex-rivera',
        email: 'alex.rivera@example.com',
        displayName: 'Alex Rivera',
        team: 'Core Crushers',
    },
    {
        username: 'sam-patel',
        email: 'sam.patel@example.com',
        displayName: 'Sam Patel',
        team: 'Cardio Crew',
    },
    {
        username: 'jordan-lee',
        email: 'jordan.lee@example.com',
        displayName: 'Jordan Lee',
        team: 'Flex Force',
    },
    {
        username: 'morgan-kim',
        email: 'morgan.kim@example.com',
        displayName: 'Morgan Kim',
        team: 'Core Crushers',
    },
];
const teams = [
    {
        name: 'Core Crushers',
        mascot: 'Plankton',
        members: ['alex-rivera', 'morgan-kim'],
    },
    {
        name: 'Cardio Crew',
        mascot: 'Pulse',
        members: ['sam-patel'],
    },
    {
        name: 'Flex Force',
        mascot: 'Range',
        members: ['jordan-lee'],
    },
];
const activities = [
    {
        user: 'alex-rivera',
        type: 'Trail run',
        durationMinutes: 42,
        caloriesBurned: 430,
        completedAt: new Date('2026-06-22T13:30:00.000Z'),
    },
    {
        user: 'sam-patel',
        type: 'Spin class',
        durationMinutes: 50,
        caloriesBurned: 520,
        completedAt: new Date('2026-06-23T16:00:00.000Z'),
    },
    {
        user: 'jordan-lee',
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 390,
        completedAt: new Date('2026-06-24T11:15:00.000Z'),
    },
    {
        user: 'morgan-kim',
        type: 'Yoga flow',
        durationMinutes: 35,
        caloriesBurned: 180,
        completedAt: new Date('2026-06-25T09:00:00.000Z'),
    },
];
const leaderboard = [
    { user: 'sam-patel', team: 'Cardio Crew', points: 1840 },
    { user: 'alex-rivera', team: 'Core Crushers', points: 1725 },
    { user: 'jordan-lee', team: 'Flex Force', points: 1610 },
    { user: 'morgan-kim', team: 'Core Crushers', points: 1495 },
];
const workouts = [
    {
        title: 'Morning Mobility Reset',
        description: 'A gentle routine for hips, shoulders, and spine before the workday.',
        difficulty: 'beginner',
        durationMinutes: 20,
    },
    {
        title: 'Lunch Break Strength Circuit',
        description: 'A compact full-body circuit using bodyweight and dumbbell movements.',
        difficulty: 'intermediate',
        durationMinutes: 35,
    },
    {
        title: 'Endurance Builder Intervals',
        description: 'Structured cardio intervals that alternate steady effort and short pushes.',
        difficulty: 'intermediate',
        durationMinutes: 45,
    },
    {
        title: 'Advanced Power Blocks',
        description: 'Explosive strength blocks for experienced athletes with solid movement basics.',
        difficulty: 'advanced',
        durationMinutes: 50,
    },
];
const seedDatabase = async () => {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
        User_1.User.insertMany(users),
        Team_1.Team.insertMany(teams),
        Activity_1.Activity.insertMany(activities),
        LeaderboardEntry_1.LeaderboardEntry.insertMany(leaderboard),
        Workout_1.Workout.insertMany(workouts),
    ]);
    console.log(`Seeded ${createdUsers.length} users, ${createdTeams.length} teams, ${createdActivities.length} activities, ${createdLeaderboard.length} leaderboard entries, and ${createdWorkouts.length} workouts.`);
};
seedDatabase()
    .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectDatabase)();
});
