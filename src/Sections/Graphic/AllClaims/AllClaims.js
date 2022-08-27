export function drawAllClaims({ output }) {
  return (
    <>
      <h1>Other claims from the speech are:</h1>
      {output.split("\n").map((claim) => (
        <p>{claim}</p>
      ))}
    </>
  );
}
