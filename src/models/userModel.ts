import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a user name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    },
});

export const user = mongoose.models.users || mongoose.model('users', userSchema);