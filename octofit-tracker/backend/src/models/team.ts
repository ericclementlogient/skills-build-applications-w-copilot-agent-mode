import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
  },
  { collection: 'teams', timestamps: true },
);

export default model('Team', teamSchema);