import getInfoUser from "../../model/user/UserManager";
import { db } from "../../model/dbConnect";

export default function checkLoginData(
  username: string,
  password: any,
  res: any
) {
  console.log(username);
  console.log(password);

  if (username && password) {
    let infoUser;
    let queryRequete = "SELECT * FROM users where login = ?";
    db.query(queryRequete, username, (err, results: any) => {
      if (err) {
        return console.log(err);
      }
      infoUser = results[0];
      console.log(infoUser);

      if (infoUser.mdp === password) {
        res.redirect("/profil");
        console.log("bienvenu sur votre profil");
      }
    });
  } else {
    console.log("username or password missing");
  }
}
