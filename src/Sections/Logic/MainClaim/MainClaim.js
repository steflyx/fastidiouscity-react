import { sendRequestOpenAI } from "../../../ServerConnector/ServerConnector";
import { getRelatedArticles } from "../../../BackEnd/ArticleSupport";

export async function computeMainClaim(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nThe main claim of this speech is that`;
  const mainClaim = await sendRequestOpenAI(prompt, 200);
  const relatedArticles = await getRelatedArticles(mainClaim);

  const output = {
    mainClaim: mainClaim.trim(),
    relatedArticles: relatedArticles,
  };
  return output;
}
