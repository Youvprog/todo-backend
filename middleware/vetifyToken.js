const jwt = require('jsonwebtoken')
require('dotenv').config()


function verifyToken(token) {
    let rep = null
    if(!token) return false
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , function(err, decoded) {
       if(err) {
        rep = false
       } else {
        rep = true
       }       
    })
    return rep
}


module.exports = verifyToken