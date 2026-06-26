import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  mascot: string;
  members: string[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, required: true, trim: true },
    members: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export const Team = model<TeamDocument>('Team', teamSchema);