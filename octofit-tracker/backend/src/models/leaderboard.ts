import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true },
);

export default model('LeaderboardEntry', leaderboardSchema);