import "./Input.css";
import "../Utilities/loader.css";
import { examples } from "../Examples/Examples";
import { STATUS_TYPES } from "../Utilities/constants";

export function Input({ setInput, analyzeInput, status, setStatus }) {
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
              setInput(example.text);
            }}
            key={key}
          >
            <span>{example.name}</span> by {example.author}
          </li>
        ))}
      </ul>
      <textarea
        id="speech-input"
        onChange={(evt) => setInput(evt.target.value)}
      ></textarea>
      <div
        className="button"
        style={{ display: status === STATUS_TYPES.IDLE ? "" : "none" }}
        onMouseUp={() => {
          setStatus(STATUS_TYPES.PROCESSING);
          analyzeInput();
        }}
      >
        Analyze!
      </div>
      <div
        className="loader"
        style={{ display: status === STATUS_TYPES.PROCESSING ? "" : "none" }}
      ></div>
    </section>
  );
}
