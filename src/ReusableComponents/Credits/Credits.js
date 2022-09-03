import { useState } from "react";
import { DialogPage } from "../DialogPage/DialogPage";
import "./Credits.css";

export function Credits() {
  const [info, setInfo] = useState(null);

  return (
    <>
      <DialogPage info={info} setInfo={setInfo} />
      <div className="footerTopBorder"></div>
      <section className="footer">
        <h2 onMouseUp={() => setInfo("about")}>About</h2>
        <h2 onMouseUp={() => setInfo("disclaimer")}>Disclaimer</h2>
      </section>
    </>
  );
}
