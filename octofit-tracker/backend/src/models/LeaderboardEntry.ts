import { Schema, model } from 'mongoose';

export interface LeaderboardEntryDocument {
  user: string;
  team?: string;
  points: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    user: { type: String, required: true, trim: true },
    team: { type: String, trim: true },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model<LeaderboardEntryDocument>(
  'LeaderboardEntry',
  leaderboardEntrySchema
);