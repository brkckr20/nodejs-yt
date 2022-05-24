const express = require("express");
const app = express();
const morgan = require("morgan");
const adminRoutes = require("./routes/adminRoutes")
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middlewares/authMiddlevare")

const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/node-blog"
const port = 3000;
mongoose.connect(DB_URL, {
    useNewUrlParser: true
}).then((result) => {
    app.listen(port, () => {
        console.log(`http://localhost:${port} is runnig`)
    })
    console.log("Database connected successfully")
}).catch((err) => {
    console.log(err)
})


app.set("view engine", "ejs")


app.use(morgan('tiny'));
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.get('*', checkUser)



app.get("/", (req, res) => {
    /* res.send("<h1>anasayfa</h1>"); */
    /* res.sendFile(__dirname + "/views/index.html") */
    /* res.sendFile("/views/index.html", { root: __dirname }) */
    //doğrudan views klösörünü arar
    res.redirect("/blog")
    /*     res.render("index", { // değer gonderme
            title: "HomePage"
        }); */
})

//routes
app.use("/", authRoutes)
app.use("/admin", requireAuth, adminRoutes)
app.use("/blog", blogRoutes)


/* 
app.get("/add", (req, res) => {
    const blog = new Blog({
        title: "Yeni yazı 2",
        short: "short acıklama 2",
        long: "uzun aciklama 2"
    })

    blog.save().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
})

app.get("/all",(req,res)=>{
    Blog.find().then((result)=>{
        res.send(result)
    }).catch(err=>{
        console.log(err)
    })
})
app.get("/single",(req,res)=>{
    Blog.findById('628cd49470d8f8bfcd44b4ad').then((result)=>{
        res.send(result)
    }).catch(err=>{
        console.log(err)
    })
}) */

app.get("/about", (req, res) => {
    /* res.sendFile("/views/about.html", { root: __dirname }) */
    res.render("about", { // değer gonderme
        title: "About"
    });
})

//yönlendirme islemi
app.get("/about-us", (req, res) => {
    res.redirect("/about");
})

app.use((req, res) => {
    /* res.status(404).sendFile("./views/_404.html", { root: __dirname }) */
    res.render("_404", { // değer gonderme
        title: "Not Found"
    });
})

