import { useState } from "react";
import { Input, LoadingPage, Output } from "./Pages/Pages";
import { Sections } from "./Sections/Sections";
import { STATUS_TYPES } from "./Utilities/constants";
import { examples } from "./Examples/Examples";

function App() {
  const [inputText, setInputText] = useState(null);
  const [status, setStatus] = useState(STATUS_TYPES.WAITING_INPUT);
  const [sections, setSections] = useState(new Sections());

  function analyzeInput() {
    setStatus(STATUS_TYPES.PROCESSING);
    sections.compute(
      inputText === null ? examples[1].text : inputText,
      onComplete
    );
  }

  function onComplete() {
    setStatus(STATUS_TYPES.PROCESSED);
  }

  if (status === STATUS_TYPES.WAITING_INPUT) {
    return (
      <main>
        <Input setInputText={setInputText} analyze={analyzeInput} />
      </main>
    );
  }
  if (status === STATUS_TYPES.PROCESSING) {
    return (
      <main>
        <LoadingPage />
      </main>
    );
  }
  if (status === STATUS_TYPES.PROCESSED) {
    return (
      <main>
        <Output sections={sections} />
      </main>
    );
  }
}

export default App;
