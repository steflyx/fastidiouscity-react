function computePoliticalLeaning(response) {
  if (response === "Liberal" && response === "Conservative") return response;
  if (response.search("Liberal") > 0 && response.search("Conservative") < 0)
    return "Liberal";
  if (response.search("Liberal") < 0 && response.search("Conservative") > 0)
    return "Conservative";
  return "Neutral";
}

export function drawPoliticalSpectrum({ response }) {
  const leaning = computePoliticalLeaning(response);

  return (
    <div>
      <h1>Here's the bar - direction {leaning}</h1>
      <h2>We believe the speech is {response}</h2>
    </div>
  );
}
