let express=require('express')
const { dbConnection } = require('./dbConnection')
const { ObjectId } = require('mongodb')
let app=express()

app.use(express.json())

app.get('/student-read',async(req, res)=>{
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students") 
    let data=await studentCollection.find().toArray();
    let resObj={
        status:1,
        msg:"Student List",
        data
    }
    res.send(resObj)
})

app.post("/student-insert",async(req, res)=>{
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students") 

    // let obj={
    //     name:req.body.name,
    //     roll:req.body.roll
    // }
    let {Sname,Semail, Sroll}=req.body
    
    let obj={Sname,Semail, Sroll}

    let checkEmailnRollNo=await studentCollection.findOne({$or: [{ Semail }, { Sroll }]})
    console.log(checkEmailnRollNo) 
    if(checkEmailnRollNo){
        return res.send({
            status:0,
            msg:"Email ID or Roll No already exists...."
        })
    }

    let insertResponse=await studentCollection.insertOne(obj)

    let resObj=({
        status:1,
        msg:"Data Insert",
        insertResponse
    })
    res.send(resObj)
    console.log("New student details added")

})

app.put("/student-update/:id",async(req, res)=>{
    let {id} = req.params
    let {Sname, Semail, Sroll}=req.body

    let updateFields = {};
    if (Sname) updateFields.Sname = Sname;
    if (Semail) updateFields.Semail = Semail;
    if (Sroll) updateFields.Sroll = Sroll;

    if (Object.keys(updateFields).length === 0) {
        return res.send({
            status: 0,
            msg: "No fields provided to update."
        });
    }

    
    let myDB=await dbConnection()
    let studentCollection = myDB.collection("students"); 

    let updateResponse= await studentCollection.updateOne(
        {_id:new ObjectId(id)},
        {$set:updateFields}
    );
    res.send({
        status:1,
        msg:"Student Updated",
        updateResponse
    });
});
app.delete("/student-delete/:id",async(req, res)=>{
    let {id}=req.params;
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students") 
    let deleteResponse=await studentCollection.deleteOne({_id:new ObjectId(id)})

    let resObj={
        status:1,
        msg:"Data Deleted",
        deleteResponse
    }
    res.send(resObj)
})

app.listen("3000")
