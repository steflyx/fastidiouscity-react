import "./MainClaim.css";
import { getGPT3Response } from "../BackEnd/BackEnd";

export class MainClaim {
  async compute(input) {
    const prompt =
      "Consider this speech:\n\n" +
      input +
      "\n\nWhat is the main claim of this speech?";

    this.claim = await getGPT3Response(prompt, {
      max_tokens: 200,
      temperature: 0.5,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
  }

  draw(key) {
    return <MainClaimGraphic text={this.claim} key={key} />;
  }
}

export function MainClaimGraphic({ text }) {
  return (
    <section id="main-claim" className="analysis-section">
      <h1>{text}</h1>
    </section>
  );
}
