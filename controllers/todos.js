const db = require('../database')
const getCurrUser = require('../middleware/getCurrUser')
const verifyToken = require('../middleware/vetifyToken')
module.exports = {
    getTodos: async (req, res) => {
        try {
            const email = await getCurrUser(req.headers.authorization)
            if(!email) return res.status(404).send({msg: 'User not found'})
            const result = await db.query('SELECT * FROM TODOS WHERE email = ? ORDER BY position DESC', [email])
            res.status(200).send(result[0])
            
        } catch (error) {
            console.log(error)
            res.status(500).send('BAD REQUEST')
        }
    },
    createTodo: async (req, res) => {
        const position_gap = 16384
        const { id, title, due_date, description } = req.body
        const token = req.headers.authorization
        const response = verifyToken(token)
        if(!response) return res.status(401).send({ msg: 'Token not valid or not found, plz login again'})
        const email = await getCurrUser(req.headers.authorization)
        if(title){
            try {
                let position = null
                const result = await db.query('SELECT MAX(position) FROM TODOS WHERE email = ? ', [email])
                position = result[0][0]['MAX(position)'] + position_gap
                await db.query('INSERT INTO TODOS (id, title, due_date, description, email, position) VALUES (?, ?, ?, ?, ?, ?)',[id, title, due_date, description, email, position])
                res.status(201).send({msg: 'TODO CREATED SUCCESSFULLY', todo: {
                    id,
                    title,
                    due_date,
                    description,
                    completed: 0,
                    email,
                    position,
                } })  
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
            await db.query('UPDATE todos SET ?  WHERE id= ?',[data, id])
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