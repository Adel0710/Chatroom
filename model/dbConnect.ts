import mysql from 'mysql2'
// import { config } from './config';

export const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'Cocobon94',
    database:'myirl'
})

