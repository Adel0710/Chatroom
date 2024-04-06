import { db } from "../../model/dbConnect";
import bcrypt from 'bcrypt';

export default async function registerController(
  username: any,
  password: any,
  firstName: string,
  lastName: string,
  email: any,
  res: any
) {
  console.log("good2");

  try {
    console.log("good3");

    console.log(username, password, firstName, lastName, email);

    const hashedPassword = await bcrypt.hash(password, 10);
    let requete_sql = `INSERT INTO users(login, mdp, email, date_inscription,nom, prenom) VALUES (?,?,?,NOW(),?,?)`;
    var inserts = [username, hashedPassword, email, lastName, firstName];

    await db.execute(requete_sql, inserts);
    console.log("vous avez été inscrit");
    res.redirect("/");
  } catch (error) {
    console.error("Vous n'avez pas été inscrit, recommencez");
  }
}
