const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';  

app.use(express.json());

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    res.status(400).json({ error: 'No prompt provided' });
    return;
  }

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 7,
  });

  try {
    const chatbotAnswer = response.data.choices[0].text.trim();
    res.json({ answer: chatbotAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
