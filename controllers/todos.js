const db = require('../database')
const getToken = require('../middleware/getToken')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const email = getToken(req.headers.authorization)
            const result = await db.query('SELECT * FROM TODOS WHERE email = ?', [email])
            res.status(200).send(result[0])
            
        } catch (error) {
            console.log(error)
            res.status(500).send('BAD REQUEST')
        }
    },
    createTodo: async (req, res) => {
        const { title, due_date, description } = req.body
        const email = getToken(req.headers.authorization)
        if(title){
            try {
                await db.query('INSERT INTO TODOS (title, due_date, description, email) VALUES (?, ?, ?, ?)', [title, due_date, description, email])
                res.status(201).send({msg: 'TODO CREATED SUCCESSFULLY'})  
            } catch (error) {
                console.log(error)
            }
        }
    },
    updateTodo: async (req, res) => {
        try {
            const data = req.body
            const id = req.params.id
            await db.query('UPDATE todos SET ?  WHERE id= ?',[data, id]);
            //await db.query('UPDATE todos SET title=?, due_date=?, description=?, completed=?, position=? WHERE id= ?',[title, due_date, description,completed, position, id]);
            res.status(200).send({msg: 'Todo updated successfully'})

        } catch (error) {
            console.log(error)
            res.status(500).send({msg: 'Something went wrong'})
        }

    },
    deleteTodo: async (req, res) => {
        try {
            await db.query('DELETE FROM todos WHERE id = ?', [req.params.id])
            res.status(202).send({msg: 'TODO DELETED SUCCESSFULLY'})
        } catch (error) {
            console.log(error)
        }
    }
}