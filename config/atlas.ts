import mongoose from "mongoose";
import dotenv from 'dotenv';
import { logger } from "../logger/logger";
dotenv.config();

const atlas = process.env.ATLAS;
if(!atlas){
    throw new Error("missing connection string");
}

export const connect_to_atlas = async()=>{
    try {
        await mongoose.connect(atlas);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

const db:mongoose.Connection=mongoose.connection;
db.on('error',(err:unknown)=>{
    logger.error(err);
    process.exit(1);
});
db.on('connected',()=>{
    logger.info('connected to atlas');
});
db.on('disconnected',()=>{
    logger.info('disconnected to atlas');
});