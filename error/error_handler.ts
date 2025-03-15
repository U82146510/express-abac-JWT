import { type Request,type Response,type NextFunction } from "express";

export class AppError extends Error{
    public status_code:number;
    constructor(message:string,status_code:number){
        super(message);
        this.status_code=status_code;
        Error.captureStackTrace(this, this.constructor);
    }
    
};

export class NotFoundError extends AppError{
    constructor(message='Resource not found'){
        super(message,404);
    }
};

export class UnauthorizedError extends AppError{
    constructor(message='Unauthorized access'){
        super(message,401);
    }
};

export class ForbiddenError extends AppError{
    constructor(message='Forbidden'){
        super(message,403)
    }
};

export class ValidationError extends AppError{
    constructor(message='Invalid data'){
        super(message,400);
    }
};

export const error_handler = (err:Error,req:Request,res:Response,next:NextFunction):void=>{
    console.error(err.stack);
    if(err instanceof AppError){
        res.status(err.status_code).json({
            success:false,
            message:err.message
        });
        return;
    }
    res.status(500).json({success:false,message:'Internal server error'})
};