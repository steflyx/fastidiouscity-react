import { getRelatedArticles } from "../../../BackEnd/ArticleSupport";

export async function computeMainClaim(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nThe main claim of this speech is that`;
  const mainClaim =
    "The Trump administration accomplished more than any other administration in history"; //await sendRequestOpenAI(prompt, 200);

  /*
  const relatedArticlesUrls = await retrieveRelatedUrls(mainClaim);
  const relatedArticles = await Promise.all(
    relatedArticlesUrls.map((url) => scrapeCleanArticle(url))
  );
  const relatedArticlesWithSupportInfo = await Promise.all(
    relatedArticles.map((article) => isArticleSupporting(mainClaim, article))
  );

  const output = {
    mainClaim: mainClaim.trim(),
    relatedArticles: relatedArticlesWithSupportInfo,
  };
  */

  const relatedArticles = await getRelatedArticles(mainClaim);
  const output = {
    mainClaim: mainClaim.trim(),
    relatedArticles: relatedArticles,
  };
  return output;
}
