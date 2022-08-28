import { Loader } from "../../ReusableComponents/Loader/Loader";
import "./LoadingPage.css";

export function LoadingPage() {
  return (
    <section className="loadingContainer">
      <Loader />
      <h2 className="loadingText">Loading... This might take a few moments</h2>
    </section>
  );
}
