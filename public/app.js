const chatForm = document.getElementById('chat-form');
const promptInput = document.getElementById('prompt');
const answerElement = document.getElementById('answer');

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const prompt = promptInput.value;

  const API_URL = "https://chat-gpt-cvss-assistant.vercel.app/";

  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const chatbotAnswer = data.answer;
    answerElement.textContent = chatbotAnswer;
  } catch (error) {
    console.error('Error:', error);
    answerElement.textContent = 'An error occurred. Please try again.';
  }
});