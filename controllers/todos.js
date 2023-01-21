const db = require('../database')
const getCurrUser = require('../middleware/getCurrUser')
const verifyToken = require('../middleware/vetifyToken')
module.exports = {
    getTodos: async (req, res) => {
        try {
            const email = getCurrUser(req.headers.authorization)
            if(!email) return res.status(404).send({msg: 'User not found'})
            const result = await db.query('SELECT * FROM TODOS WHERE email = ?', [email])
            res.status(200).send(result[0])
            
        } catch (error) {
            console.log(error)
            res.status(500).send('BAD REQUEST')
        }
    },
    createTodo: async (req, res) => {
        const { id, title, due_date, description } = req.body
        const token = req.headers.authorization
        const response = verifyToken(token)
        if(!response) return res.status(401).send({ msg: 'Token not valid or not found, plz login again'})
        const email = getCurrUser(req.headers.authorization)
        if(title){
            try {
                await db.query('INSERT INTO TODOS (id, title, due_date, description, email) VALUES (?, ?, ?, ?, ?)', [id, title, due_date, description, email])
                res.status(201).send({msg: 'TODO CREATED SUCCESSFULLY'})  
            } catch (error) {
                console.log(error)
            }
        }
    },
    updateTodo: async (req, res) => {
        try {
            const data = req.body
            const token = req.headers.authorization
            const response = verifyToken(token)
            if(!response) return res.status(401).send({ msg: 'Token not valid or not found, plz login again'})
            const id = req.params.id
            await db.query('UPDATE todos SET ?  WHERE id= ?',[data, id]);
            res.status(200).send({msg: 'Todo updated successfully'})

        } catch (error) {
            console.log(error)
            res.status(500).send({msg: 'Something went wrong'})
        }

    },
    deleteTodo: async (req, res) => {
        try {
            const token = req.headers.authorization
            const response = verifyToken(token)
            if(!response) return res.status(401).send({ msg: 'Token not valid or not found, plz login again'})
            await db.query('DELETE FROM todos WHERE id = ?', [req.params.id])
            res.status(202).send({msg: 'TODO DELETED SUCCESSFULLY'})
        } catch (error) {
            console.log(error)
        }
    }
}