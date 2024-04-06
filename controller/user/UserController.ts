import {pool} from '../../model/dbConnect'
import bcrypt from 'bcrypt'
let localStorage = require('localStorage')

interface IUser {   
    username: string;
    password: any ; 
    id: number ; 
}
function saveCurrentUser(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
export default function checkLoginData(username:string,password:any,res: any) {
    console.log("tutu" + username);
    console.log(password);
    localStorage.setItem("lastname", "Smith");   
    // function getCurrentUser(): IUser {
    //     var userStr : any= localStorage.getItem('currentUser');
    //     try {
    //       return JSON.parse(userStr);
    //     } catch (ex) {
    //       console.error('erreur');
    //       ;
    //     }
    // }

    if (username && password) {
        let infoUser;
        let queryRequete = 'SELECT * FROM users where login = ?';
        pool.query( queryRequete ,username, (err,results: any) => {
            if (err) {
                return console.log(err);
            }
            infoUser = results[0]
            console.log(infoUser);
            var user = { username: infoUser.login, password: infoUser.mdp, id:infoUser.id };
            saveCurrentUser(user);
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