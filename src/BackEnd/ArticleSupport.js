import {
  sendRequestOpenAI,
  retrieveRelatedUrls,
  scrapeCleanArticle,
} from "../ServerConnector/ServerConnector";

async function isArticleSupporting(claim, article) {
  const claimClean = claim.substr(0, 4) === "that" ? claim.substr(5) : claim;
  const prompt = `Consider this claim: "${claimClean}"\nNow consider this article's summary: "${article.text}"\nDo you think the article supports the claim (short answer)?`;
  const response = await sendRequestOpenAI(prompt, 128);
  article.isSupporting = response;
  return article;
}

export async function getRelatedArticles(claim) {
  const relatedArticlesUrls = await retrieveRelatedUrls(claim);
  const relatedArticles = await Promise.all(
    relatedArticlesUrls.map((url) => scrapeCleanArticle(url))
  );
  const relatedArticlesWithSupportInfo = await Promise.all(
    relatedArticles.map((article) => isArticleSupporting(claim, article))
  );
  return relatedArticlesWithSupportInfo;
}
