import mysql from 'mysql2'
import { config } from './config';

export const pool = mysql.createConnection({
    host: config.host,
    user: config.user,
    password:config.password,
    database:config.database
})

