import mongoose from 'mongoose';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      { name: 'OctoRunners', mascot: 'Velocity', city: 'Seattle', memberCount: 18 },
      { name: 'Flex Appeal', mascot: 'Pulse', city: 'Austin', memberCount: 14 },
      { name: 'Cardio Crew', mascot: 'Dash', city: 'Boston', memberCount: 16 },
    ]);

    await User.insertMany([
      {
        username: 'maya_chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        team: 'OctoRunners',
        role: 'Team Captain',
      },
      {
        username: 'jordan_lee',
        email: 'jordan.lee@example.com',
        displayName: 'Jordan Lee',
        team: 'Flex Appeal',
        role: 'Member',
      },
      {
        username: 'sam_rivera',
        email: 'sam.rivera@example.com',
        displayName: 'Sam Rivera',
        team: 'Cardio Crew',
        role: 'Member',
      },
    ]);

    await Activity.insertMany([
      {
        username: 'maya_chen',
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-24T13:00:00Z'),
      },
      {
        username: 'jordan_lee',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 510,
        activityDate: new Date('2026-08-25T22:30:00Z'),
      },
      {
        username: 'sam_rivera',
        type: 'Cycling',
        durationMinutes: 60,
        caloriesBurned: 620,
        activityDate: new Date('2026-08-26T11:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { username: 'sam_rivera', team: 'Cardio Crew', points: 1920, rank: 1 },
      { username: 'maya_chen', team: 'OctoRunners', points: 1815, rank: 2 },
      { username: 'jordan_lee', team: 'Flex Appeal', points: 1690, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Morning Mobility Flow',
        category: 'Mobility',
        durationMinutes: 20,
        difficulty: 'Beginner',
        targetMuscles: ['hips', 'hamstrings', 'shoulders'],
      },
      {
        name: 'Hill Sprint Builder',
        category: 'Cardio',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        targetMuscles: ['quads', 'glutes', 'calves'],
      },
      {
        name: 'Full-Body Power Circuit',
        category: 'Strength',
        durationMinutes: 45,
        difficulty: 'Advanced',
        targetMuscles: ['chest', 'back', 'core', 'legs'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
