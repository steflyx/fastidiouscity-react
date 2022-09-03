import { Loader } from "../../ReusableComponents/Loader/Loader";
import "./LoadingPage.css";

export function LoadingPage({ isError }) {
  if (!isError) {
    return (
      <section className="loadingContainer">
        <Loader />
        <h2 className="loadingText">
          Loading... This might take a few moments
        </h2>
      </section>
    );
  } else {
    return (
      <section className="loadingContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 460.775 460.775"
          width="80"
          height="80"
        >
          <path
            style={{ fill: "#C91403" }}
            d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
          />
        </svg>
        <div>
          <h2 className="loadingText">
            There was an issue :( Please, reload the page and try again.
          </h2>
          <h2 className="loadingText loadingTextSmall">
            Unfortunately this is only a prototype, so it's far from perfect!
          </h2>
        </div>
      </section>
    );
  }
}
