import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';

export interface ITarget extends Document {
    user: Types.ObjectId | IUser;
    month: number;
    year: number;
    target_amount: number;
}

const TargetSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    },
    target_amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Create a compound index to ensure one target per user per month/year
TargetSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model<ITarget>('Target', TargetSchema);