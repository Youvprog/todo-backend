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
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log(decoded)
    return rep
}


module.exports = verifyToken