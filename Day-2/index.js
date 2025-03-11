let http = require("http")

let server = http.createServer((request, response) => {
    if (request.url == "/news") {
        let obj={
            status:1,
            data:[
                {
                    newsTitle:'shreyas',
                    newsDes:"Hello Shreyas"
                },
                {
                    newsTitle:"urankar",
                    newsDes:"Hello Urankar"
                }
            ]
        }
        response.end(JSON.stringify(obj))
        // response.end(obj)
    }
    if (request.url == "/about") {

    }
    if (request.url == "/course") {

    }
    if (request.url == "/") {
        response.end("Welcome to Node.Js") 
    }
})

server.listen("8000") //http://localhost:8000