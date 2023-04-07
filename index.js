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

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    'prompt': prompt,
    'max_tokens': 50,
    'n': 1,
    'stop': null,
    'temperature': 1
  };

  try {
    const response = await axios.post(API_URL, data, { headers: headers });
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
