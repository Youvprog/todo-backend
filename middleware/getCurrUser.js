require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../database')

async function getCurrUser(token) {
    let email = null
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err) {
            email = null
           } else {
               email = decoded.email
           }
    })
    const [user] = await db.query('SELECT * FROM USERS WHERE email = ?', [email])
    if(!user[0]) {
        email = null
        return email
    }
    return email
}
module.exports = getCurrUser