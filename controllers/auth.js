require('dotenv').config()

const db = require('../database')
const jwt = require('jsonwebtoken')


module.exports = {
    registerUser: async (req, res) => {
        const { email } = req.body;
            if(email) {
                try {
                    await db.query('INSERT INTO USERS (email) VALUES(?)', [email])
                    res.status(201).send({msg: 'user created'})
                } catch (error) {
                    console.log(error)
                    res.status(500).send({msg: 'Something went wrong, try again'})
                }
            }
    },
    loginUser: async (req, res) => {
        const { email } = req.body
        const [user] = await db.query('SELECT * from users WHERE email = ?', [email])
        if(!user[0]) {
            return res.status(404).send('USER DOSENT EXIST')
        }
        const accessToken = jwt.sign(user[0], process.env.ACCESS_TOKEN_SECRET )
        res.status(200).send({token: accessToken })
    }
}