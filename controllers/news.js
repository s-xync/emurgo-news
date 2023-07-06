const axios = require("axios");

// Fetch N news articles
exports.fetchArticles = async (req, res) => {
  try {
    const { N } = req.params; // Number of articles to fetch
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?apikey=${process.env.GNEWS_API_KEY}&max=${N}&lang=en`
    );
    const articles = response.data.articles;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};