import { URL_SERVER, APP_NAME, APP_TOKEN } from "../Utilities/config";

export async function sendRequestOpenAI(prompt, maxTokens) {
  const gpt3Model = "text-davinci-002";

  try {
    return await fetch(URL_SERVER + "/gpt3connector", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationRequesting: APP_NAME,
        applicationToken: APP_TOKEN,
        prompt: prompt,
        maxTokens: maxTokens,
        gpt3Model: gpt3Model,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw "Errore di connessione con il server";
        }
      })
      .then((res) => {
        return res.generatedText;
      });
  } catch (error) {
    throw "Errore di connessione con il server";
  }
}
