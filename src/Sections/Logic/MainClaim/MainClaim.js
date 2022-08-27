import { isArticleSupporting } from "../../../BackEnd/ArticleSupport";
import {
  sendRequestOpenAI,
  retrieveRelatedUrls,
  scrapeCleanArticle,
} from "../../../ServerConnector/ServerConnector";

export async function computeMainClaim(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nThe main claim of this speech is`;
  const mainClaim = await sendRequestOpenAI(prompt, 200);
  console.log(mainClaim);
  const relatedArticlesUrls = await retrieveRelatedUrls(mainClaim);
  console.log(relatedArticlesUrls);
  const relatedArticles = await Promise.all(
    relatedArticlesUrls.map((url) => scrapeCleanArticle(url))
  );
  console.log(relatedArticles);
  const relatedArticlesWithSupportInfo = await Promise.all(
    relatedArticles.map((article) => isArticleSupporting(mainClaim, article))
  );
  console.log(relatedArticlesWithSupportInfo);

  const output = {
    mainClaim: mainClaim.trim(),
    relatedArticles: relatedArticlesWithSupportInfo,
  };
  return output;
}
