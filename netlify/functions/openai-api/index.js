import fetch from 'isomorphic-fetch';

export async function handler(event) {
  let myInput = undefined;
  try {
    console.log(event.body);
    myInput = JSON.parse(event.body).input;
    // rest of the code
  } catch (error) {
    console.error('Error parsing JSON input:', error);
    return {
      statusCode: 400,
      body: `Error: ${error}, req body: ${event.body.input}, myInput: ${myInput}`,
    };
  }

  function _renderSimpleIngredientsOnly() {
    if (myInput.simpleIngredientsOnly.toLowerCase() === 'yes') {
      return `- No "fancy" ingredients, like saffron or caviar\n\nRecipe:\n`;
    }
    return `\nRecipe:\n`;
  }

  const myPrompt = `Give me one recipe that best meets the following criteria. List the title, ingredients and instructions.\n\nCriteria:\n
    - Preparation time: ${myInput.preparationTime}
    - Dish type: ${myInput.dishType}
    - Cook only in: ${myInput.cookIn}
    - Country of origin: ${myInput.origin}
    - Seasonal to: ${myInput.seasonalTo}
    ${_renderSimpleIngredientsOnly()}
  `;

  console.log(myPrompt);
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
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    }),
  };

  try {
    const response = await fetch(
      'https://api.openai.com/v1/completions',
      openAiConfig,
    );
    const data = await response.json();

    // Modify the data object by adding a new key-value pair
    data.myPrompt = myPrompt;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: `error occured: ${error}`,
    };
  }
}
