const express = require("express");
const router = express.Router();
const controller = require("../controllers/news");

// Fetch N news articles
router.get("/articles/:N", controller.fetchArticles);

module.exports = router;
