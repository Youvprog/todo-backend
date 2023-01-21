require('dotenv').config()
const jwt = require('jsonwebtoken')


function getCurrUser(token) {
    let email = null
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err) {
            email = null
           } else {
               email = decoded.email
           }
    })
    return email
}
module.exports = getCurrUser