import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(
            process.env.MONGO_URI ?? 'placeholder'
        );

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connection established!');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection failed!');
            console.log(err);
            process.exit();
        });

    } catch (error) {
        console.log('Failed database connection!');
        console.log(error);
    }
}