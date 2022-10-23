const app = require("express")()
const multer = require("multer")
const path = require("path")


app.set('view engine', 'ejs');

var fileName = ""

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        fileName = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const files = multer({storage})

app.post("/post-file", files.single("file"), (req, res) => {
    res.render("uploaded", { url: `f.fileuploader.vercel.app/${fileName}` })
})

app.get("/:filename", (req, res) => {
    res.sendFile(__dirname + `/uploads/${req.params.filename}`)
})

app.listen(4000, () => { console.log("http://localhost:4000") })