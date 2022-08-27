import "./Input.css";
import { examples } from "../../Examples/Examples";

export function Input({ setInputText, analyze }) {
  return (
    <section id="input-section">
      <h1>Welcome to Fastidiouscity!</h1>
      <h2>
        Give us a politician speech and we will discover its every secret!
      </h2>
      <h3>Or try with one of our examples:</h3>
      <ul>
        {examples.map((example, key) => (
          <li
            onMouseUp={() => {
              document.getElementById("speech-input").value = example.text;
              setInputText(example.text);
            }}
            key={key}
          >
            <span>{example.name}</span> by {example.author}
          </li>
        ))}
      </ul>
      <textarea
        id="speech-input"
        onChange={(evt) => setInputText(evt.target.value)}
      ></textarea>
      <div className="button" onMouseUp={analyze}>
        Analyze!
      </div>
    </section>
  );
}
