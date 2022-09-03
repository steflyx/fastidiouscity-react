import "./MainClaim.css";
import { RelatedArticle } from "../RelatedArticle/RelatedArticle";

export function DrawMainClaim({ output }) {
  return (
    <>
      <div className="claimContainer">
        <h3>
          <span className="halfHighlight">
            The main claim of this speech is that...
          </span>
        </h3>
        <div className="claimTextContainer">
          <div className="rect"></div>
          <h4>{output.mainClaim}</h4>
        </div>
        <div></div>
      </div>
      <div>
        <h3>
          <span className="halfHighlight">
            Here are some articles related to this claim
          </span>
        </h3>
        <div className="articleGallery">
          {output.relatedArticles.map((article, i) => (
            <RelatedArticle article={article} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
