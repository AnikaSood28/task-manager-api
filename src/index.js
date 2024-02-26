const express = require('express');
const app = express();
require('./db/mongoose');
const Tasks = require('./models/task');
const User = require('./models/user');

const port = process.env.PORT;
const userRouter = require('./routers/user');
const jwt  = require('jsonwebtoken')


// const multer = require('multer')
// const upload=multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000

//     },
//     fileFilter(req,file,cb){
//           if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('please upload a word doc'))
//           }

//         // cb(new  Error('file must be a pdf'))
//          cb(undefined,true)
//         // cb(undefined,false)
//     }
// })
// // const errorMiddleware=(req,res,next)=>{
// //     throw new Error('from any middleware')
// // }

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })


app.use(express.json());  
app.use(userRouter);



const taskRouter=require('./routers/task')
app.use(taskRouter)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});


