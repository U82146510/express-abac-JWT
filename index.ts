import express,{type Application} from 'express';
import {connect_to_atlas} from './config/atlas.ts';
import { error_handler } from './error/error_handler.ts';
import { user } from './routes/user.ts';

const app:Application = express();
const port:number = 3000;

app.use(express.json());
app.use('/',user);
app.use(error_handler);

process.on("SIGINT",()=>{
    process.exit(0);
});

const start = async()=>{
    try {
        await connect_to_atlas();
        app.listen(port,()=>console.log('On'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
