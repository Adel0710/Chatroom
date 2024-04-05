import {pool} from '../dbConnect'
export default function getInfoUser (username:string) {
    let infoUser;
    let queryRequete = 'SELECT * FROM users where login = ?';
    pool.query( queryRequete ,username, (err,results: any) => {
        if (err) {
            return console.log(err);
        }
        // infoUser = results[0]
        console.log(results[0]);
        return results[0] ; 
    })    
    // console.log(result[]);
    
    return infoUser;
} 