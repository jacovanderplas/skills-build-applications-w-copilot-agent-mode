import mongoose from 'mongoose';

import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/octofit_db';

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
    difficulty: 'beginner' as const,
    durationMinutes: 20,
  },
  {
    title: 'Lunch Break Strength Circuit',
    description: 'A compact full-body circuit using bodyweight and dumbbell movements.',
    difficulty: 'intermediate' as const,
    durationMinutes: 35,
  },
  {
    title: 'Endurance Builder Intervals',
    description: 'Structured cardio intervals that alternate steady effort and short pushes.',
    difficulty: 'intermediate' as const,
    durationMinutes: 45,
  },
  {
    title: 'Advanced Power Blocks',
    description: 'Explosive strength blocks for experienced athletes with solid movement basics.',
    difficulty: 'advanced' as const,
    durationMinutes: 50,
  },
];

const seedDatabase = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] =
    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

  console.log(
    `Seeded ${createdUsers.length} users, ${createdTeams.length} teams, ${createdActivities.length} activities, ${createdLeaderboard.length} leaderboard entries, and ${createdWorkouts.length} workouts.`
  );
};

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });