const express = require("express");
const router = express.Router();
const controller = require("../controllers/news");

// Fetch N news articles
/**
 * @swagger
 * /news/articles/{N}:
 *   get:
 *     summary: Fetch N news articles
 *     parameters:
 *       - in: path
 *         name: N
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of articles to fetch
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/articles/:N", controller.fetchArticles);

// Find a news article by title
/**
 * @swagger
 * /news/articles/title/{title}:
 *   get:
 *     summary: Find a news article by title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the news article
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/articles/title/:title", controller.findArticleByTitle);

// Find a news article by author
/**
 * @swagger
 * /news/articles/author/{author}:
 *   get:
 *     summary: Find a news article by author
 *     parameters:
 *       - in: path
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *         description: Author of the news article
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/articles/author/:author", controller.findArticleByAuthor);

// Search articles by keywords
/**
 * @swagger
 * /news/articles/search/{keywords}:
 *   get:
 *     summary: Search articles by keywords
 *     parameters:
 *       - in: path
 *         name: keywords
 *         required: true
 *         schema:
 *           type: string
 *         description: Keywords to search for in articles. comma seperated string.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/articles/search/:keywords", controller.searchArticles);

module.exports = router;
