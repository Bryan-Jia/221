//imports
    let express = require('express');
    let mongodb = require('mongodb');
    let router = express.Router();
    let connectionString = 'mongodb://localhost:27017/database'; //local
    let database = 'cluster';

//get
    router.post('/getItem', async (req, res) => {
        //tbd
    });

//save
    router.post('/saveItem', async (req, res) => {
        //tbd
    });

//update
    router.post('/updateItem', async (req, res) => {
        //tbd
    });

//delete
    router.post('/deleteItem', async (req, res) => {
        //tbd
    });

//database
    async function loadCollection(collection){
        let client = await mongodb.MongoClient.connect(connectionString, {
            useNewUrlParser: true
        });
        return client.db(database).collection(collection);
    }

//export
    module.exports = router;