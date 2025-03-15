import { type Request,type Response,type NextFunction } from "express";
import { logger } from "../logger/logger";
import {AppError, ValidationError} from '../error/error_handler.ts';
import jwt from "jsonwebtoken";
import {type user_body,assertUser} from '../interfaces/user.ts';
import {user_schema,login_schema} from '../validators/user.ts';
import {User} from '../model/user.ts';
import {login_body} from '../interfaces/user.ts';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new AppError('JWT secret not provided',500);
};

const create_token = (payload:{name:string,id:string})=>{
    try {
        return jwt.sign(payload,JWT_SECRET,{
            expiresIn:'15m'
        })
    } catch (error) {
        logger.error(error)
        throw new ValidationError();
    }
};

export const register_user = async(req:Request<{},{},user_body>,res:Response,next:NextFunction)=>{
    try {
        const {value,error} = user_schema.validate(req.body);
        if(error){
            next(new ValidationError(error.message));
            return;
        }
        assertUser(value);
        const if_exists = await User.findOne({name:value.name});
        if(if_exists){
            next();
            return;
        }
        const user = await User.create({name:value.name,role:value.role});
        res.status(201).json({message:'user created'});
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const login_user = async(req:Request<{},{},login_body>,res:Response,next:NextFunction)=>{
    const {value,error} = login_schema.validate(req.body);
    try {
        if(error){
            res.status(400).json({message:error.message});
            return;
        };
        assertUser(value);
        const verify_user = await User.findOne({name:value.name});
        if(!verify_user){
            res.status(404).json({message:'not found'});
            return;
        };
        const token = create_token({name:verify_user.name,id:verify_user.id});

        res.status(200).json({message:'login successfully',token});
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const delete_user = async(req:Request<{},{},login_body>,res:Response,next:NextFunction)=>{
    const {value,error} = login_schema.validate(req.body);
    try {
        if(error){
            res.status(400).json({message:error.message});
            return;
        };
        assertUser(value);
        const delete_user = await User.deleteOne({name:value.name});
        res.status(201).json({message:'deleted'});
    } catch (error) {
        logger.error(error);
        next(error);
    }
};