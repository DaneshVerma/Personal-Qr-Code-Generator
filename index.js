import qr from "qr-image"
import fs from "fs"
import express from "express"
import bodyParser from "body-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"

const app = express()
const port = 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req, res)=>{
    var link = req.body["text"]
    var image = qr.image(link, "M" ,{type: "png"})
    image.pipe(fs.createWriteStream(__dirname + "/public/myqr.png"))
    res.sendFile(__dirname + "/public/submit.html")
})

app.listen(port, (req, res)=>{
    console.log("server listning on port:"+ port)
})
