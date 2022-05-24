const User = require("../models/Users")
const jwt = require("jsonwebtoken")

const maxAge = 60 * 60 * 24; //1 gün

const createToken = (id) => {
    return jwt.sign({ id }, "gizli kelime", { expiresIn: maxAge })
}

const loginGet = (req, res) => {
    res.render("login", {
        title: "Giris"
    })
}
const loginPost = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect("/admin")
    } catch (error) {
        console.log(error)
    }
}
const signupget = (req, res) => {
    res.render("signup", {
        title: "Kayıt"
    })
}
const singupPost = (req, res) => {
    const user = new User(req.body);
    user.save().then(result => {
        res.redirect("/login")
    }).catch(err => console.log(err))
}
const logoutGet = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/login");
}
module.exports = {
    loginGet,
    loginPost,
    signupget,
    singupPost,
    logoutGet
}