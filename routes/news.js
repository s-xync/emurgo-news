const express = require("express");
const router = express.Router();
const controller = require("../controllers/news");

// Fetch N news articles
router.get("/articles/:N", controller.fetchArticles);

// Find a news article by title
router.get("/articles/title/:title", controller.findArticleByTitle);
module.exports = router;
