const express = require("express")
const models = require("../models/index")
const petugas = models.petugas
const app = express()
const md5 = require("md5")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const jwt = require("jsonwebtoken")
const SECRET_KEY = "semangat"
const auth = require("../auth")

const storage = multer.diskStorage({
    destination: (req,file,cal) => {
        cal(null, "./image/img_admin")
    },
    filename: (req,file, cal) => {
        cal(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage:storage})

app.get("/", async(req,res)=>{
    let result = await petugas.findAll()
    res.json(result)
    console.log(auth)
})

app.post("/", upload.single("image"), async(req,res)=>{
    if (!req.file){
        res.json({
            message: "No uploaded file"
        })
    }else{
        let data = await {
            username: req.body.username,
            password: md5(req.body.password),
            nama_petugas: req.body.nama_petugas,
            level:req.body.level,
            image: req.file.filename
        }
    
        petugas.create(data)
        .then(result=>{
            res.json({message:"data has been inserted"})
        })
        .catch(error=>{
            res.json({message:error.message})
        })
    }
})

app.put("/", auth, upload.single("image"), async(req,res)=>{
    let param = await {id_petugas:req.body.id_petugas}
    let data = await {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level:req.body.level
    }

    if(req.file){
        petugas.findOne({where:param})
        .then(result => {
            let oldImageName = result.image
            let dir = path.join(__dirname,"../image/img_admin",oldImageName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error=>{
            console.log(error)
        })

        data.image = req.file.filename
    }

    petugas.update(data, {where:param})
    .then(result=>{
        res.json({message:"data has been updated"})
    })

    .catch(error=>{
        res.json({message:error.message})
    })
})

app.delete("/:id_petugas", auth, async(req,res)=>{
    let param = await {id_petugas:req.params.id_petugas}
    let result = await petugas.findOne({where: param})
    let oldImageName = result.image
        
    let dir = path.join(__dirname,"../image/img_admin",oldImageName)
    fs.unlink(dir, err => console.log(err))

    petugas.destroy({where:param})
    .then(result=>{
        res.json({message:"data has been destroyed"})
    })
    .catch(error=>{
        res.json({message:error.message})
    })
})

app.post("/login", async(req,res)=>{
    let param = {
        username:req.body.username,
        password:md5(req.body.password)
    }

    let result = await petugas.findOne({where:param})
    if(result){
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY)

        res.json({
            logged: true,
            data: result,
            role: result.level,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "invalid username or password"
        })
    }
})

module.exports = app