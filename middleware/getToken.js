require('dotenv').config()
const jwt = require('jsonwebtoken')


function getToken (str) {
    const arr = Array.from(str)
    let token = ''
    let email = null
    for(let i=3; i<arr.length; i++) {
        token += arr[i]
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err) {
            return res.status(401).send({msg: 'Token not Valid'})
           } else {
               email = decoded.email
           }
    })
    return email
}
module.exports = getToken