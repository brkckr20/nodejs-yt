const Blog = require("../models/Blogs")

const blogIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then(result => { // sort kısmı son kaydın ustte gelmesi için
        res.render("index", {
            title: "HomePage",
            blogs: result
        })
    }).catch(err => {
        console.log(err)
    })
}

const blogContent = (req, res) => {
    const id = req.params.id;

    Blog.findById(id).then(result => {
        res.render("blog", {
            blog: result,
            title: "Detail"
        })
    }).catch(err => {
        res.render("_404", { // değer gonderme
            title: "Not Found"
        });
    })
}

module.exports = {
    blogIndex,
    blogContent

}