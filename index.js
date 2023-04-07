const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    res.status(400).json({ error: 'No prompt provided' });
    return;
  }
  try {

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "I am a cybersecurity expert, and you are my top consultant in the field of cybersecurity. You have extensive experience in CVSS calculations and scenarios." },
        { role: "user", content: "I want you to create a JSON structure in Turkish that includes all the CVSS values for the scenario I provided to you, along with explanatory points for each CVSS category related to the mentioned scenario. No additional explanation is needed." },
        { role: "user", content: "Scenario: " + prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    let chatbotJSON;
    if (typeof response.data.choices != 'undefined' && response.data.choices.length > 0) {
      try {
        const chatbotAnswer = response.data.choices[0].message.content.trim();
        chatbotJSON = JSON.parse(chatbotAnswer);
      } catch (error) {
        console.error('Chatbot response could not be parsed:', error);
      }
    } else {
      console.error('Unable to get response from the chatbot.');
    }
 
    res.json({ answer: chatbotJSON });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
