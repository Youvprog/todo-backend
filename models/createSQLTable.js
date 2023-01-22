const db  = require('../database')

async function getData(sql_query, condition=null) {
    if(!sql_query) return
    try {
        return await db.query(sql_query, [condition])
    } catch (error) {
        console.log(error)
    }
    
}

async function insertData(sql_query, ...data) {
    if(!sql_query || !data) return
    try {
        await db.query(sql_query, [...data])
    } catch (error) {
        console.log(error)
    }
    return {...data}
}

async function updateData(sql_query,id,data) {
    if(!sql_query) return 
    try {
        await db.query(sql_query, [id, data])
        return true
    } catch (error) {
        console.log()
    }
}

async function deleteData(sql_query,id) {
    if(!sql_query) return
    try {
        await db.query(sql_query, [id])
        return true
    } catch (error) {
        console.log(error)
    }
}
