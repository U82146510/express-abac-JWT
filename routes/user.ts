import { Router } from "express";
import {register_user,login_user,delete_user} from '../controllers/user.ts';
import {verify_token} from '../middleware/auth.ts';


export const user:Router = Router();

user.post('/register',register_user);
user.post('/login',login_user);
user.post('/delete',verify_token,delete_user);