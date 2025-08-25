import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    region: string;
    hire_date: Date;
    status: 'active' | 'inactive';
    current_region_start_date: Date;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    current_region_start_date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);