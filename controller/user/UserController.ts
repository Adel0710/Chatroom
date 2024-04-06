import getInfoUser from "../../model/user/UserManager";
import {pool} from '../../model/dbConnect'
import bcrypt from 'bcrypt'

export default function checkLoginData(username:string,password:any,res: any) {
    console.log(username);
    console.log(password);
    
    if (username && password) {
        let infoUser;
        let queryRequete = 'SELECT * FROM users where login = ?';
        pool.query( queryRequete ,username, (err,results: any) => {
            if (err) {
                return console.log(err);
            }
            infoUser = results[0]
            console.log(infoUser);
            bcrypt.compare(password, infoUser.mdp, function(err, result) {
                console.log('true');
                res.redirect('/profil')
                console.log('bienvenu sur votre profil');
            });
        })
        
    } else {
        console.log('username or password missing');
    }
}