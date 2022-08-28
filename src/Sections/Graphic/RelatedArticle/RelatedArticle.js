import "./RelatedArticle.css";

function isImgAvailable(img) {
  return img !== "" && img !== undefined;
}

export function RelatedArticle({ article }) {
  return (
    <div className="articleContainer">
      <div
        className="imgContainer"
        style={{
          backgroundImage: "url('" + article.img + "')",
          display: isImgAvailable(article.img) ? "" : "none",
        }}
      />
      <div
        className="articleData"
        style={{
          height: isImgAvailable(article.img)
            ? "calc(100% - 240px)"
            : "calc(100% - 40px)",
        }}
      >
        <div className="mainData">
          <p className="supportingText">
            Supports the claim{/*article.isSupporting*/}
          </p>
          <p className="articleTitle">{article.title}</p>
          <p className="articleText">{article.text}</p>
        </div>
        <a className="readArticle" href={article.url}>
          Read it
        </a>
      </div>
    </div>
  );
}
