import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

async function clearDatabase() {
  console.log('🗑️  Clearing existing data...');
  try {
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Database cleared');
  } catch (error) {
    console.error('✗ Error clearing database:', error);
    throw error;
  }
}

async function seedUsers() {
  console.log('👥 Seeding users...');
  const users = [
    {
      email: 'alice@octofit.com',
      name: 'Alice Johnson',
      password: 'hashed_password_1',
      age: 28,
      fitnessLevel: 'advanced',
      goals: ['Build muscle', 'Increase endurance'],
      totalPoints: 2450,
    },
    {
      email: 'bob@octofit.com',
      name: 'Bob Smith',
      password: 'hashed_password_2',
      age: 35,
      fitnessLevel: 'intermediate',
      goals: ['Lose weight', 'Stay healthy'],
      totalPoints: 1820,
    },
    {
      email: 'carol@octofit.com',
      name: 'Carol Davis',
      password: 'hashed_password_3',
      age: 31,
      fitnessLevel: 'advanced',
      goals: ['Marathon training', 'Run faster'],
      totalPoints: 2890,
    },
    {
      email: 'david@octofit.com',
      name: 'David Wilson',
      password: 'hashed_password_4',
      age: 42,
      fitnessLevel: 'beginner',
      goals: ['Get fit', 'Improve flexibility'],
      totalPoints: 950,
    },
    {
      email: 'emma@octofit.com',
      name: 'Emma Brown',
      password: 'hashed_password_5',
      age: 26,
      fitnessLevel: 'intermediate',
      goals: ['Build strength', 'CrossFit competition'],
      totalPoints: 2120,
    },
  ];

  try {
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error('✗ Error seeding users:', error);
    throw error;
  }
}

async function seedTeams(users: any[]) {
  console.log('🏆 Seeding teams...');
  const teams = [
    {
      name: 'Morning Warriors',
      description: 'Early birds who crush their workouts before breakfast',
      members: [users[0]._id, users[2]._id, users[4]._id],
      totalPoints: 7460,
    },
    {
      name: 'Fitness Fanatics',
      description: 'Dedicated athletes pushing their limits every day',
      members: [users[1]._id, users[3]._id],
      totalPoints: 2770,
    },
  ];

  try {
    const createdTeams = await Team.insertMany(teams);
    console.log(`✓ Created ${createdTeams.length} teams`);
    return createdTeams;
  } catch (error) {
    console.error('✗ Error seeding teams:', error);
    throw error;
  }
}

async function seedActivities(users: any[]) {
  console.log('🏃 Seeding activities...');

  const activities = [];
  const activityTypes = ['running', 'cycling', 'swimming', 'strength', 'yoga'];
  const intensities = ['low', 'medium', 'high'];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    for (let j = 0; j < 5; j++) {
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const intensity = intensities[Math.floor(Math.random() * intensities.length)];
      const duration = Math.floor(Math.random() * 90) + 20;
      const calories = Math.floor(duration * (5 + Math.random() * 5));
      const points = Math.floor(calories / 10);

      activities.push({
        userId: user._id,
        type,
        duration,
        distance: type === 'running' || type === 'cycling' ? Math.random() * 15 + 2 : undefined,
        calories,
        intensity,
        notes: `${type.charAt(0).toUpperCase() + type.slice(1)} session at ${intensity} intensity`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        points,
      });
    }
  }

  try {
    const createdActivities = await Activity.insertMany(activities);
    console.log(`✓ Created ${createdActivities.length} activities`);
    return createdActivities;
  } catch (error) {
    console.error('✗ Error seeding activities:', error);
    throw error;
  }
}

async function seedLeaderboard(users: any[], teams: any[]) {
  console.log('📊 Seeding leaderboard...');

  const leaderboardEntries: Array<{
    userId?: any;
    teamId?: any;
    points: number;
    activitiesCount: number;
    rank: number;
    type: 'user' | 'team';
    lastUpdated: Date;
  }> = [];

  // User leaderboard entries
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  sortedUsers.forEach((user, index) => {
    const activitiesCount = Math.floor(Math.random() * 25) + 5;
    leaderboardEntries.push({
      userId: user._id,
      points: user.totalPoints,
      activitiesCount,
      rank: index + 1,
      type: 'user',
      lastUpdated: new Date(),
    });
  });

  // Team leaderboard entries
  const sortedTeams = [...teams].sort((a, b) => b.totalPoints - a.totalPoints);
  sortedTeams.forEach((team, index) => {
    leaderboardEntries.push({
      teamId: team._id,
      points: team.totalPoints,
      activitiesCount: team.members.length * 5,
      rank: index + 1,
      type: 'team',
      lastUpdated: new Date(),
    });
  });

  try {
    const createdEntries = await Leaderboard.insertMany(leaderboardEntries);
    console.log(`✓ Created ${createdEntries.length} leaderboard entries`);
    return createdEntries;
  } catch (error) {
    console.error('✗ Error seeding leaderboard:', error);
    throw error;
  }
}

async function seedWorkouts() {
  console.log('💪 Seeding workouts...');

  const workouts = [
    {
      name: 'Morning Run',
      description: 'A refreshing 5km run to start your day',
      type: 'running',
      difficulty: 'beginner',
      duration: 30,
      exercises: ['Warm-up jog', '5km run', 'Cool-down walk'],
      caloriesBurned: 300,
      targetMuscles: ['Legs', 'Cardiovascular'],
    },
    {
      name: 'CrossFit WOD',
      description: 'High-intensity workout of the day',
      type: 'strength',
      difficulty: 'advanced',
      duration: 45,
      exercises: ['Deadlifts', 'Box jumps', 'Push-ups', 'Burpees'],
      caloriesBurned: 450,
      targetMuscles: ['Full body'],
    },
    {
      name: 'Yoga Flow',
      description: 'Relaxing yoga session for flexibility and balance',
      type: 'yoga',
      difficulty: 'beginner',
      duration: 50,
      exercises: ['Sun salutation', 'Downward dog', 'Child pose', 'Savasana'],
      caloriesBurned: 150,
      targetMuscles: ['Full body', 'Flexibility'],
    },
    {
      name: 'Cycling Adventure',
      description: 'Scenic 20km cycling route',
      type: 'cycling',
      difficulty: 'intermediate',
      duration: 60,
      exercises: ['Road cycling', 'Hill climbs', 'Sprints'],
      caloriesBurned: 400,
      targetMuscles: ['Legs', 'Cardiovascular'],
    },
    {
      name: 'Swimming Laps',
      description: 'Pool swimming for cardio and full body workout',
      type: 'swimming',
      difficulty: 'intermediate',
      duration: 45,
      exercises: ['Freestyle laps', 'Backstroke', 'Butterfly strokes'],
      caloriesBurned: 350,
      targetMuscles: ['Full body', 'Cardiovascular'],
    },
    {
      name: 'Strength Training',
      description: 'Upper body strength focused workout',
      type: 'strength',
      difficulty: 'intermediate',
      duration: 55,
      exercises: ['Bench press', 'Rows', 'Shoulder press', 'Pull-ups'],
      caloriesBurned: 380,
      targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
    },
    {
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for max calorie burn',
      type: 'cardio',
      difficulty: 'advanced',
      duration: 30,
      exercises: ['Jumping jacks', 'Burpees', 'Mountain climbers', 'High knees'],
      caloriesBurned: 400,
      targetMuscles: ['Full body', 'Cardiovascular'],
    },
    {
      name: 'Pilates Core',
      description: 'Core-focused pilates session',
      type: 'yoga',
      difficulty: 'intermediate',
      duration: 40,
      exercises: ['Crunch', 'Leg circles', 'Roll-ups', 'Planks'],
      caloriesBurned: 200,
      targetMuscles: ['Core', 'Abs'],
    },
  ];

  try {
    const createdWorkouts = await Workout.insertMany(workouts);
    console.log(`✓ Created ${createdWorkouts.length} workouts`);
    return createdWorkouts;
  } catch (error) {
    console.error('✗ Error seeding workouts:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('\n🌱 Starting database seeding...\n');

    await connectDatabase();
    console.log('\n');

    await clearDatabase();
    const users = await seedUsers();
    const teams = await seedTeams(users);
    await seedActivities(users);
    await seedLeaderboard(users, teams);
    await seedWorkouts();

    console.log('\n✅ Database seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
