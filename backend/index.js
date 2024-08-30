const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/generate-visual-hint", async (req, res) => {
  const { word } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: `An abstract representation of the word "${word}" surrounded by unrelated elements.`,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating visual hint");
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
