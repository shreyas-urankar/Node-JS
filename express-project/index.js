let express = require('express')
const {checkTokens} = require("./checkTokenMiddleware")
require("dotenv").config()
console.log(process.env.myToken)
let app = express()
app.use(express.json());

// let myTokens = "1234"


// let checkTokens = (req, res, next) => {
//     if (req.query.token === '' || req.query.token===undefined) {
//         return res.send(
//             {
//                 status: 0,
//                 msg: "Please fill the token."
//             }
//         )
//     }
//     if(req.query.token!=myTokens){
//         return res.send(
//             {
//                 status: 0,
//                 msg: "Please fill the correct token."
//             }
//         )
//     }
//     console.log("Welcome to Middleware")
//     next();
// }

// app.use(checkTokens)

app.get("/", (req, res) => {
    res.send({ status: 1, msg: 'Home Page API' })
})

app.get("/news", checkTokens, (req, res) => {
    res.send({ status: 1, msg: 'News API' })
})

app.get("/news/:id", (req, res) => {
    let currentId = req.params.id
    res.send("News details API." + currentId)
})

app.post("/login", (req, res) => {
    console.log(req.body)
    res.status(200).json({

        status: 1,
        msg: 'Login API',
        data: req.body,
        queryData: req.query
    })

})



app.listen('3000')