require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
}).promise()

const USER_TABLE = 'CREATE TABLE IF NOT EXISTS USERS(email varchar(50) NOT NULL PRIMARY KEY)'
const TODO_TABLE = 'CREATE TABLE IF NOT EXISTS TODOS (id varchar(255) NOT NULL PRIMARY KEY,title varchar(100) NOT NULL, description varchar(255), completed BOOLEAN DEFAULT FALSE, position bigint(255), email varchar(50), due_date varchar(50), FOREIGN KEY (email) REFERENCES USERS(email))'

async function createTable(sql_query) {
    if(!sql_query) return 
    try {
        await db.query(sql_query)
    } catch (error) {
        console.log(error)
    }
}

createTable(USER_TABLE)
createTable(TODO_TABLE)

module.exports = db