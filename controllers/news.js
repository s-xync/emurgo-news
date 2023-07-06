const axios = require("axios");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

// Fetch N news articles
exports.fetchArticles = async (req, res) => {
  try {
    const { N } = req.params; // Number of articles to fetch

    // Check if articles are cached in Redis
    const cachedArticles = await redisClient.get(`articles:${N}`);

    if (cachedArticles) {
      // Articles found in cache, return the cached data
      res.json(JSON.parse(cachedArticles));
    } else {
      // Articles not found in cache, fetch from GNews API
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?apikey=${process.env.GNEWS_API_KEY}&max=${N}&lang=en`
      );
      const articles = response.data.articles;

      // Cache the fetched articles in Redis
      await redisClient.set(
        `articles:${N}`,
        JSON.stringify(articles),
        "EX",
        3600
      ); // Cache for 1 hour (3600 seconds)

      res.json(articles);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

// Find a news article by title
exports.findArticleByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const response = await axios.get(
      `https://gnews.io/api/v4/search?apikey=${process.env.GNEWS_API_KEY}&q=${title}`
    );
    const articles = response.data.articles;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to find articles by title" });
  }
};

// Find a news article by author
exports.findArticleByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const response = await axios.get(
      `https://gnews.io/api/v4/search?apikey=${process.env.GNEWS_API_KEY}&q=${author}`
    );
    const articles = response.data.articles;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to find articles by author" });
  }
};

// Search articles by keywords
exports.searchArticles = async (req, res) => {
  try {
    const { keywords } = req.params;
    // expecting keywords to be a comma seperated string of keywords
    const keywordString = keywords.split(",").join(" OR ");
    const response = await axios.get(
      `https://gnews.io/api/v4/search?apikey=${process.env.GNEWS_API_KEY}&q=${keywordString}`
    );
    const articles = response.data.articles;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to search articles" });
  }
};
