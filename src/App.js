import { useState } from "react";
import { Input, LoadingPage, Output } from "./Pages/Pages";
import { Sections } from "./Sections/Sections";
import { STATUS_TYPES } from "./Utilities/constants";
import { examples } from "./Examples/Examples";
import { Credits } from "./ReusableComponents/Credits/Credits";

function App() {
  const [inputText, setInputText] = useState(null);
  const [status, setStatus] = useState(STATUS_TYPES.WAITING_INPUT);
  const [sections, setSections] = useState(new Sections());

  function analyzeInput() {
    setStatus(STATUS_TYPES.PROCESSING);
    sections.compute(
      inputText === null ? examples[1].text : inputText,
      onComplete,
      onFailure
    );
  }

  function onComplete() {
    setStatus(STATUS_TYPES.PROCESSED);
  }

  function onFailure() {
    setStatus(STATUS_TYPES.ERROR);
  }

  if (status === STATUS_TYPES.WAITING_INPUT) {
    return (
      <main>
        <Input
          inputText={inputText}
          setInputText={setInputText}
          analyze={analyzeInput}
        />
        <Credits />
      </main>
    );
  }
  if (status === STATUS_TYPES.PROCESSING || status === STATUS_TYPES.ERROR) {
    return (
      <main>
        <LoadingPage isError={status === STATUS_TYPES.ERROR} />
      </main>
    );
  }
  if (status === STATUS_TYPES.PROCESSED) {
    return (
      <main>
        <Output sections={sections} />
        <Credits />
      </main>
    );
  }
}

export default App;
