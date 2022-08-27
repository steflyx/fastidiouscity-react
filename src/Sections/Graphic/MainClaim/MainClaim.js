import { RelatedArticle } from "../RelatedArticle/RelatedArticle";

export function drawMainClaim({ output }) {
  return (
    <>
      <h1>The main claim of this speech is</h1>
      <p>{output.mainClaim}</p>
      <h2>We found these articles related to the claim:</h2>
      {output.relatedArticles.map((article, i) => (
        <RelatedArticle article={article} key={i} />
      ))}
    </>
  );
}
