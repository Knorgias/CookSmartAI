import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/openai-api', (req, res) => {
  const myInput = req.body.input;
  const myPrompt = `Understand the Emotion based on the Input and provide a helpful stoic Quote from a philosopher of any time.\n\nInput: \"${myInput}\"\nQuote:`;

  // The configuration for the API request to OpenAI
  const openAiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-curie-001',
      prompt: myPrompt,
      temperature: 1,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    }),
  };

  fetch('https://api.openai.com/v1/completions', openAiConfig)
    .then((response) => response.json())
    .then((data) => {
      res.send(data.choices[0].text);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Hmm, something went wrong.. please try again');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
