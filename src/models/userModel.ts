import mongoose from 'mongoose';

interface IUser {
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    isAdmin: boolean,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
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

export const User = mongoose.models.users as mongoose.Model<IUser> || mongoose.model<IUser>('users', userSchema);