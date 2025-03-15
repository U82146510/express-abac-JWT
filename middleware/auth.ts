import jwt from "jsonwebtoken";
import { type Request,type Response,type NextFunction } from "express";
import {logger} from '../logger/logger.ts';
import dotenv from 'dotenv';
import { User,type IUser } from "../model/user.ts";
import { Resource,type IResources } from "../model/resource.ts";


dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("missing jwt secret");
};

function access<T extends IUser,U extends IResources>(user:T,resource:U,action:string){
    if(resource.owner===user.id){
        return true;
    }
    if(action ==='GET'){
        if(resource.type==='private'&&user.role!=='admin'){
            return false;
        }
        return resource.type==='public';
    }
    if(action==='PUT'){
        return user.role==='admin';
    }
    if(action==='POST'){
        return user.role==='admin'
    }
    if(action==='DELETE'){
        return user.role==='admin'
    }
    return false;
}


export const verify_token = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers['authorization'];
        if(!token || !token.startsWith('Bearer')){
            res.status(401).json({message:'Unauthorized'});
            return;
        }
        const jwt_value = token.split(" ")[1];
        const decoded = jwt.verify(jwt_value,JWT_SECRET);
        req.user = decoded as {name:string,id:string};
        next();
    } catch (error) {
        console.error("JWT Verification Error:",error);
        res.status(403).json({message:'Forbidden'});
    }
};


export const abac_middleware = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const action = req.method;
        const {name} = req.params;
        const user = await User.findOne({name});
        if(!user){
            res.status(404).json({message:'not found'});
            return;
        }
        const resources = await Resource.findOne({owner:user.id})
        if(!resources){
            res.status(404).json({message:'not found'});
            return;
        }
        if(access(user,resources,action)){
            next();
        }
        res.status(403).json({message:'Forbidden'});
    } catch (error) {
        logger.error(error);
        res.status(500).json({message:'Internal server error'})
    }
};