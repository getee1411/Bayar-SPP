const jwt = require("jsonwebtoken")
const SECRET_KEY = "semangat"

// function level_1 () 

auth = (req,res,next)=>{
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    let jwtheader = {
        algorithm: "HS256"
    }

    if(token===null){
        res.status(404).json({message:"unauthorized"})
    }else{
        jwt.verify(token, SECRET_KEY, jwtheader, (error,user)=>{
            if(error){
                res
                .status(401)
                .json({
                    message:"invalid token"
                })
                console.log(error)
            } else {
                console.log(user)
                next()
            }
        })
    }
}


module.exports = auth