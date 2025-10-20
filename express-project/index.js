let express=require('express')

let app=express()
app.use(express.json());


app.get("/", (req, res)=>{
    res.send({status:1, msg:'Home Page API'})
})

app.get("/news", (req, res)=>{
    res.send({status:1, msg:'News API'})
})

app.get("/news/:id",(req, res)=>{
    let currentId=req.params.id
    res.send("News details API." + currentId)
})

app.post("/login",(req, res)=>{
    console.log(req.body)
    res.status(200).json({
    
        status:1,
        msg:'Login API', 
        data:req.body,
        queryData:req.query
    })

})



app.listen('3000')