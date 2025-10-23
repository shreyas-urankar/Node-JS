
let checkTokens = (req, res, next) => {
    if (req.query.token === '' || req.query.token===undefined) {
        return res.send(
            {
                status: 0,
                msg: "Please fill the token."
            }
        )
    }
    if(req.query.token!=process.env.myToken){
        return res.send(
            {
                status: 0,
                msg: "Please fill the correct token."
            }
        )
    }
    console.log("Welcome to Middleware")
    next();
}

module.exports = { checkTokens };
