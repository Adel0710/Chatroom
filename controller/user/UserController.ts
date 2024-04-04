import getInfoUser from "../../model/user/UserManager";
export default function checkLoginData(username:string,password:any,res: any,req:any) {
    if (username && password) {
        getInfoUser(username,req)
        res.redirect('/profil')
    } else {
        console.log('username or password missing');
    }
}