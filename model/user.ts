import {type Document,model,Schema} from "mongoose";
import { Resource } from "./resource.ts";
import {logger} from '../logger/logger.ts';

export interface IUser extends Document{
    name:string;
    role:'admin'|'user';
};

const user_schema = new Schema<IUser>({
    name:{type:String,required:true},
    role:{type:String,enum:['admin','user']}
});

user_schema.pre('save',async function(this){
    try {
        await Resource.create({
            type:this.role === "admin" ? "private" : "public",
            owner:this.id
        });
    } catch (error) {
        logger.error(error);
    }
})

export const User = model<IUser>("User",user_schema);