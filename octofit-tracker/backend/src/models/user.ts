import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
  },
  { collection: 'users', timestamps: true },
);

export default model('User', userSchema);