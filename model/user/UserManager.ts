import {pool} from '../dbConnect'
import expressSession,{ SessionData } from 'express-session'

declare module 'express-session' {
    interface SessionData {
        user?: { id: number, username: string , prenom: string};
    }
}
export default function getInfoUser (username:string,req: any) {
    pool.query('SELECT * FROM users where login = ?',username, (err,results: any) =>{
        if (err) {
            return console.log(err);
        }

        
        req.session = {
            id : results[0].id ,
            username : results[0].login,
            prenom : results[0].prenom 
        }
        console.log(req.session.username);
        
        return results[0].id; 
    })
}