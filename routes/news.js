const express = require("express");
const router = express.Router();
const controller = require("../controllers/news");

// Fetch N news articles
router.get("/articles/:N", controller.fetchArticles);

// Find a news article by title
router.get("/articles/title/:title", controller.findArticleByTitle);

// Find a news article by author
router.get("/articles/author/:author", controller.findArticleByAuthor);

// Search articles by keywords
router.get("/articles/search/:keywords", controller.searchArticles);

module.exports = router;
