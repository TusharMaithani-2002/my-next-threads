import mongoose from 'mongoose';
// const mongoose = require('mongoose');

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log("MONGODB_URL not found, check env variables");
    if(isConnected) return console.log('Already connected to MONGO DB');

    // connecting to mongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}