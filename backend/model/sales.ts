import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './user';

export interface ISale extends Document {
    user: Types.ObjectId | IUser;
    amount: number;
    date: Date;
    product_category: string;
    commission_rate: number;
}

const SaleSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    product_category: {
        type: String,
        required: true
    },
    commission_rate: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<ISale>('Sale', SaleSchema);