import { useState } from "react";
import {
  AnalysisSection,
  sectionTypes,
} from "./AnalysisSections/AnalysisSection";
import { Input } from "./Components/Input";
import { STATUS_TYPES } from "./Utilities/constants";

function App() {
  const [input, setInput] = useState(null);
  const [analysisSections, setAnalysisSections] = useState(
    sectionTypes.map((section) => new AnalysisSection(section))
  );
  const [status, setStatus] = useState(STATUS_TYPES.IDLE);

  async function analyzeInput() {
    await Promise.all(
      analysisSections.map((analysisSection) => analysisSection.compute(input))
    );
    setStatus(STATUS_TYPES.PROCESSED);
  }

  return (
    <main>
      <Input
        setInput={setInput}
        analyzeInput={analyzeInput}
        status={status}
        setStatus={setStatus}
      />
      {status === STATUS_TYPES.PROCESSED
        ? analysisSections.map((analysisSection, key) =>
            analysisSection.draw(key)
          )
        : null}
    </main>
  );
}

export default App;
