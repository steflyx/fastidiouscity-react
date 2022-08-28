import { URL_SERVER, APP_NAME, APP_TOKEN } from "../Utilities/config";
import { MAX_ARTICLE_LENGTH } from "../Utilities/constants";

export async function sendRequestOpenAI(prompt, maxTokens) {
  const gpt3Model = "text-davinci-002";

  return maxTokens < 150
    ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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

export async function scrapeArticle(link) {
  return {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    title: "Lorem Ipsum",
    img: "https://www.repstatic.it/content/nazionale/img/2022/08/28/155513494-870d7444-5c7b-420f-ac79-c1082417c4f2.jpg",
  };

  try {
    return await fetch(URL_SERVER + "/scrapeArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: link,
        applicationRequesting: APP_NAME,
        applicationToken: APP_TOKEN,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          throw "Articolo irraggiungibile";
        }
        throw "Errore di connessione con il server";
      })
      .then((res) => {
        return {
          text: res.articleText,
          title: res.articleTitle,
          img: res.articleImg,
          url: link,
        };
      });
  } catch (error) {
    if (error === "Articolo irraggiungibile") {
      throw "Articolo irraggiungibile";
    }
    throw "Errore di connessione con il server";
  }
}

async function cleanAndSummarizeArticle(text) {
  const prompt =
    "Clean and summarize in a few sentences this article scraped from a website:\n\n" +
    text.substr(0, MAX_ARTICLE_LENGTH) +
    "\n\nSummary:";
  const summary = await sendRequestOpenAI(prompt, 256);
  return summary.trim();
}

export async function scrapeCleanArticle(link) {
  const article = await scrapeArticle(link);
  article.text = await cleanAndSummarizeArticle(article.text);
  return article;
}

export async function retrieveRelatedUrls(query) {
  return ["url1", "url2", "url3"];

  try {
    return await fetch(URL_SERVER + "/googleSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        applicationRequesting: APP_NAME,
        applicationToken: APP_TOKEN,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw "Errore di connessione con il server";
      })
      .then((res) => {
        return res.urls;
      });
  } catch (error) {
    throw "Errore di connessione con il server";
  }
}
