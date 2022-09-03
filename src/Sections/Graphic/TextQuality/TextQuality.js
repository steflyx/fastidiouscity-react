import "./TextQuality.css";

const scoreTranslation = {
  Ap: "A+",
  A: "A",
  Am: "A-",
  Bp: "B+",
  B: "B",
  Bm: "B-",
  Cp: "C+",
  C: "C",
  Cm: "C-",
  Dp: "D+",
  D: "D",
  Dm: "D-",
  Ep: "E+",
  E: "E",
  F: "F",
};

function GlobalMark({ globalScore }) {
  return (
    <p>
      The speech receives a{" "}
      <span className="globalMark">{globalScore} mark</span> for quality of
      writing
    </p>
  );
}

function RepeatedWords({ value, diffFromAverage }) {
  return (
    <div>
      <p>
        <span className="enlargedValue">
          {(Math.abs(value) * 100).toFixed(1)}%
        </span>{" "}
        Percentage of words repeated through the text.
      </p>
      <p>
        This is{" "}
        <span
          className={diffFromAverage > 0 ? "negativeScore" : "positiveScore"}
        >
          {(Math.abs(diffFromAverage) * 100).toFixed(1)}%{" "}
          {diffFromAverage > 0 ? "higher" : "lower"}
        </span>{" "}
        than average.
      </p>
    </div>
  );
}

function AvgWordsPerSentence({ value, diffFromAverage }) {
  return (
    <div>
      <p>
        <span className="enlargedValue">{value.toFixed(1)}</span> Average number
        of words per sentence.
      </p>
      <p>
        This is{" "}
        <span
          className={diffFromAverage > 0 ? "positiveScore" : "negativeScore"}
        >
          {(Math.abs(diffFromAverage) * 100).toFixed(1)}%{" "}
          {diffFromAverage > 0 ? "higher" : "lower"}
        </span>{" "}
        than average.
      </p>
    </div>
  );
}

function ReadabilityIndex({ index }) {
  return (
    <p>
      Overall, this text can be compared to that of{" "}
      <span className="globalMark">{index}</span>
    </p>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrowBackground rotatedArrow"
    >
      <path
        d="M8.5 -3.71547e-07L8.5 18M8.5 18C8.5 18 11.6875 10.5882 17 10.5882M8.5 18C8.5 18 5.3125 10.5882 -4.62826e-07 10.5882"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function DrawTextQuality({ output }) {
  return (
    <div id="textQualityContainer">
      <div>
        <Arrow />
        <GlobalMark globalScore={scoreTranslation[output.globalScore]} />
      </div>
      <div>
        <Arrow />
        <RepeatedWords
          value={output.percRepeatedWords.value}
          diffFromAverage={output.percRepeatedWords.diffFromAverage}
        />
      </div>
      <div>
        <Arrow />
        <AvgWordsPerSentence
          value={output.avgWordsPerSentence.value}
          diffFromAverage={output.avgWordsPerSentence.diffFromAverage}
        />
      </div>
      <div>
        <Arrow />
        <ReadabilityIndex index={output.readabilityIndex.index} />
      </div>
    </div>
  );
}
