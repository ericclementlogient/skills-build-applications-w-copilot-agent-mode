import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    targetMuscles: [{ type: String, required: true }],
  },
  { collection: 'workouts', timestamps: true },
);

export default model('Workout', workoutSchema);