const express=require('express')
const Tasks=require('../models/task')
const router=new express.Router()
const auth =require( '../middleware/auth')

router.get('/tasks',auth,async (req,res)=>{
   const match={}
   const sort={}
   if(req.query.status){
    match.status=req.query.status==='true'
   }

   if(req.query.sortBy){
    const parts=req.query.sortBy.split(':')
    sort[parts[0]]=parts[1]==='desc'?-1:1
   }
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
           
        }).execPopulate()
       // const tasks= await Tasks.find({owner:req.user._id})
    res.send(req.user.tasks)
}catch(e){

    res.status(500).send(e)
    }
  
    
        

})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id =req.params.id
    try{ 
        
        //const task= await Tasks.findById({_id})
        const task = await Tasks.findOne({_id,owner:req.user._id})

    if(!task){
        return  res.status(404).send()

    }
    
    res.send(task)}catch(e){
        
        res.status(500).send()

    }
   

    
  
})
router.post('/tasks',auth,async(req,res)=>{
    //const tasks=new Tasks(req.body)
    const tasks = new Tasks({
        ...req.body,
        owner:req.user._id
    })
    try{
        await tasks.save()
        res.status(201).send(tasks)}catch(e){ res.status(400).send(e)}
    
        
   
        
   
})

router.patch('/tasks/:id',auth,async(req,res) => {
    const updates =Object.keys(req.body)
    const allowedUpdates =['description','status']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        const tasks= await  Tasks.findOne({_id:req.params.id,owner:req.user._id})
       // const tasks= await Tasks.findById(req.params.id)
      
        // const tasks =await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!tasks){
            return res.status(404).send()
        }
        updates.forEach((update)=>{tasks[update]=req.body[update]})
        await tasks.save()
        res.send(tasks)
    }
    catch(e){
        res.status(400).send(e)
    }
})
router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task=await Tasks.findOneAndDelete({_id:req.params.id,owner
    :req.user._id})
        if(!task){
            return  res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send()


    }
   
})
module.exports=router