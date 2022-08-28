import "./Loader.css";

export function Loader({ additionalCSS }) {
  return (
    <div className="lds-default" style={{ ...additionalCSS }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
