import "./Conclusion.css";

export function DrawConclusion({ output }) {
  return (
    <div className="conclusionContainer">
      <h3>
        <span className="halfHighlight">Should I trust this speech?</span>
      </h3>
      <p>{output}</p>
    </div>
  );
}
