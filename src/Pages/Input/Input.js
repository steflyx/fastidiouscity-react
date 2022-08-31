import "./Input.css";
import { examples } from "../../Examples/Examples";
import { useEffect, useState } from "react";

export function Input({ setInputText, analyze }) {
  const [selectedSpeech, setSelectedSpeech] = useState(null);

  //useEffect(() => analyze());

  return (
    <section id="input-section">
      <div className="titleContainer">
        <h1>
          <span className="halfHighlight">Fastidiouscity</span>
        </h1>
        <h2>Your new fact-checking assistant!</h2>
      </div>
      <div className="letsTryContainer">
        <p>Let's try!</p>
        <svg
          width="14"
          height="14"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arrowBackground"
        >
          <path
            d="M8.5 -3.71547e-07L8.5 18M8.5 18C8.5 18 11.6875 10.5882 17 10.5882M8.5 18C8.5 18 5.3125 10.5882 -4.62826e-07 10.5882"
            stroke="black"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <textarea
        id="speech-input"
        onChange={(evt) => {
          setInputText(evt.target.value);
          setSelectedSpeech(null);
        }}
        placeholder="Paste your text here..."
      ></textarea>
      <div className="flexRow">
        <div className="exampleList">
          <p>Or try with one of our examples:</p>
          <ul>
            {examples.map((example, key) => (
              <li
                onMouseUp={() => {
                  document.getElementById("speech-input").value = example.text;
                  setInputText(example.text);
                  setSelectedSpeech(example.name);
                }}
                key={key}
              >
                <span
                  className={
                    example.name === selectedSpeech ? "halfHighlight" : ""
                  }
                >
                  <span className="speechName">{example.name}</span> -{" "}
                  {example.author}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="buttonContainer">
          <button className="button" onMouseUp={analyze}>
            Analyze!
          </button>
        </div>
      </div>
    </section>
  );
}
