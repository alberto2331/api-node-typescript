import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';

class Server{
    private app: Application;
    private port : string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();        
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log("Database online");
        }catch (error) {
            throw new Error(  );
        }
    }
    
    middlewares(){
        //CORS:
        this.app.use( cors() );
        //Boby Reading:
        this.app.use( express.json() );
        //Public Folder:
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use( this.apiPaths.users, userRoutes )
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Server running in port:"+ this.port);
        });
    }
}

export default Server;