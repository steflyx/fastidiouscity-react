import "./Output.css";

export function Output({ sections }) {
  return <section className="sectionContainer">{sections.draw()}</section>;
}
