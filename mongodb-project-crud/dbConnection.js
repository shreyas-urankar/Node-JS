const { MongoClient } = require('mongodb');
let dbCnnectionUrl = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(dbCnnectionUrl);

let dbConnection=async()=>{
    await client.connect()
    let db=client.db("mongodbProject_DataBase")
    return db;
}

module.exports={dbConnection}