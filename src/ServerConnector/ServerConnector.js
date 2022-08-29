import { URL_SERVER, APP_NAME, APP_TOKEN } from "../Utilities/config";
import { MAX_ARTICLE_LENGTH } from "../Utilities/constants";

export async function sendRequestOpenAI(prompt, maxTokens) {
  const gpt3Model = "text-davinci-002";

  return "Lorem Ipsum";

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
    text: "Lorem Ipsum",
    title: "Lorem Ipsum",
    img: "",
    url: "https://www.repstatic.it/content/nazionale/img/2022/08/29/140826930-8f30118a-a074-4ec1-bc5c-698a1a235b47.jpg",
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
