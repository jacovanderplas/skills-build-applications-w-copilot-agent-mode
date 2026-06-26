import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  user: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);