const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: console.log(process.env.REACT_APP_GPT3_API_KEY),
});
const openai = new OpenAIApi(configuration);

export async function getGPT3Response(prompt, params) {
  const response = await openai.createCompletion("text-davinci-001", {
    prompt: prompt,
    ...params,
  });

  return response.data.choices[0].text;
}
