const router = require("express").Router();
const authController = require("../controllers/authController")

router.get("/login", authController.loginGet)

router.post("/login", authController.loginPost)

router.get("/signup", authController.signupget)

router.post("/signup", authController.singupPost)

router.get("/logout", authController.logoutGet)

module.exports = router;