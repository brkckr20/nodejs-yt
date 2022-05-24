const Blog = require("../models/Blogs")

const adminIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then(result => { // sort kısmı son kaydın ustte gelmesi için
        res.render("admin", {
            title: "Admin",
            blogs: result
        })
    }).catch(err => {
        console.log(err)
    })
}

const adminAdd = (req, res) => {
    res.render("add", {
        title: "Yeni Yazi"
    })
}

const adminAddPost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(result => {
        res.redirect("/admin")
    }).catch(err => {
        console.log(err)
    });
}

const adminDelete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                link: "/admin"
            })
        }).catch(err => {
            console.log(err)
        })
}

module.exports = {
    adminIndex,
    adminAdd,
    adminAddPost,
    adminDelete
}