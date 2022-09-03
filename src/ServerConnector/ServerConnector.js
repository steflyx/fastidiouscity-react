import { URL_SERVER, APP_NAME, APP_TOKEN } from "../Utilities/config";
import { MAX_ARTICLE_LENGTH } from "../Utilities/constants";

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

export async function scrapeArticle(link) {
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
        return {
          text: "Article unreachable",
          title: "Article unreachable",
          url: link,
        };
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
    return {
      text: "Article unreachable",
      title: "Article unreachable",
      url: link,
    };
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
  if (article.text === "Article unreachable") return article;
  try {
    article.text = await cleanAndSummarizeArticle(article.text);
  } catch {
    article.text = article.title;
  }
  return article;
}

export async function retrieveRelatedUrls(query) {
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
        return [];
      })
      .then((res) => {
        return res.urls;
      });
  } catch (error) {
    return [];
  }
}
