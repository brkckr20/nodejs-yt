const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");


router.get("/", blogController.blogIndex)




router.get("/:id", blogController.blogContent)

module.exports = router