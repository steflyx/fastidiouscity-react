import { useState } from "react";
import { getRelatedArticles } from "../../../BackEnd/ArticleSupport";
import { Loader } from "../../../ReusableComponents/Loader/Loader";
import { RelatedArticle } from "../RelatedArticle/RelatedArticle";
import "./AllClaims.css";

export function DrawAllClaims({ output }) {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [articles, setArticles] = useState([]);

  async function analyzeClaim(claim) {
    console.log(claim);
    setSelectedClaim(claim);
    setArticles((oldArray) => []);
    const relatedArticles = []; //await getRelatedArticles(claim);
    setArticles((oldArray) => [...relatedArticles]);
  }

  return (
    <section className="allClaimsContainer">
      <div>
        <h3>
          <span className="halfHighlight">
            Other claims from the speech are:
          </span>
        </h3>
        <p className="disclaimer">Click on a claim to see related articles</p>
      </div>
      <div className="allClaimsTextContainer">
        {output.split("\n").map((claim, i) => {
          if (claim !== selectedClaim) {
            return (
              <p
                className="allClaims"
                key={i}
                onMouseUp={() => analyzeClaim(claim)}
              >
                {claim}
              </p>
            );
          } else {
            return (
              <div key={i}>
                <p className="allClaims" onMouseUp={() => analyzeClaim(claim)}>
                  <span className="halfHighlight">{claim}</span>
                </p>
                <div
                  className="loaderContainer"
                  style={{ display: articles.length === 0 ? "" : "none" }}
                >
                  <Loader />
                  <p>Loading... This might take a few moments</p>
                </div>
                <div
                  className="articleGallery"
                  style={{
                    display: articles.length === 0 ? "none" : "",
                    marginBottom: "40px",
                  }}
                >
                  {articles.map((article, i) => (
                    <RelatedArticle article={article} key={i} />
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
