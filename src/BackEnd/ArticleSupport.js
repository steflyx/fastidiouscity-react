import { sendRequestOpenAI } from "../ServerConnector/ServerConnector";

export async function isArticleSupporting(claim, article) {
  const claimClean = claim.substr(0, 4) === "that" ? claim.substr(5) : claim;
  const prompt = `Consider this claim: "${claimClean}"\nNow consider this article's summary: "${article.text}"\nDo you think the article supports the claim?`;
  const response = await sendRequestOpenAI(prompt, 128);
  article.isSupporting = response;
  return article;
}