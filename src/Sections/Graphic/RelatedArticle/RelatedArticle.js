export function RelatedArticle({ article }) {
  return (
    <div style={{ border: "solid 1px black" }}>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <img
        src={article.img}
        alt="Article's headline"
        style={{
          display:
            article.img !== "" && article.img !== undefined ? "" : "none",
        }}
      />
      <p>{article.isSupporting}</p>
    </div>
  );
}
