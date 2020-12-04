const MongoClient = require('mongodb').MongoClient;
const config = require('../config')

module.exports = {
    getCollection,
    // createTxtIndex
}

// Database Name
const dbName = 'cardella_db';
var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

// async function createTxtIndex() {
//     const db = await connect()
//     const collection = await getCollection('board')
//     try {
//         collection.createIndex({
//             title: "text",
//             "createdBy.fullName" : "text"

//         })
//         console.log('collection.getIndexes!', db.board.getIndexes());
//     } catch (err) {
//         console.log('Cannot create index in createTXTTINDEX', err)
//         throw err;
//     }
// }

// async function getTxtIndex() {

// }

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        const collection = db.collection('board');
        const dropRes = await collection.dropIndexes();
        console.log('dropRes', dropRes);
        const result = await collection.createIndex({ "lists.cards.title": "text" , "lists.cards.description": "text"}, { default_language: "english" });
        console.log(`Index created: ${result}`);
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}

// console.log('dropRes', dropRes);



