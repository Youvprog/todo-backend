const db  = require('../database')

async function getData(sql_query, condition=null) {
    if(!sql_query) return
    try {
        return await db.query(sql_query, [condition])
    } catch (error) {
        console.log(error)
        return null
    }
    
}

async function insertData(sql_query, ...data) {
    if(!sql_query || !data) return
    try {
        await db.query(sql_query, [...data])
        const keys = ['id', 'title', 'due_date', 'description', 'email','position']
        const obj = {}
        data.forEach((item, index) => {
            obj[`${keys[index]}`] = item
        })
        obj.completed = 0
        return obj
        
    } catch (error) {
        console.log(error)
        return null
    }
   
}

async function updateData(sql_query,data,id) {
    if(!sql_query) return 
    try {
        await db.query(sql_query, [data, id])
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

async function deleteData(sql_query,id) {
    if(!sql_query) return
    try {
        await db.query(sql_query, [id])
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    getData,
    insertData,
    updateData,
    deleteData
}

