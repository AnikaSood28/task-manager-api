// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const{MongoClient, ObjectId}=require('mongodb')
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task_manager';

const id=new ObjectId()
console.log(id)

MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    const db = client.db(databaseName);
    
    const updatePromise=db.collection('tasks').updateMany({
    },{
        $set:{
            description:'all done'
        }
    }) 
   updatePromise.then((result)=>{
    console.log(result)
   }).catch((error)=>{
    console.log(error)
   })
});
