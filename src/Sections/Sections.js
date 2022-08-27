import { computeMainClaim } from "./Logic/MainClaim/MainClaim";
import { computeAllClaims } from "./Logic/AllClaims/AllClaims";
import { drawMainClaim } from "./Graphic/MainClaim/MainClaim";
import { drawAllClaims } from "./Graphic/AllClaims/AllClaims";

const sections = [
  { name: "MainClaim", compute: computeMainClaim, draw: drawMainClaim },
  { name: "AllClaims", compute: computeAllClaims, draw: drawAllClaims },
];

export class Sections {
  constructor() {
    this.outputs = null;
  }

  async compute(inputText, onComplete) {
    this.outputs = await Promise.all(
      sections.map((section) => section.compute(inputText))
    );
    onComplete();
  }

  draw(externalCSS) {
    return sections.map((section, index) => (
      <div key={index} style={{ ...externalCSS }}>
        {section.draw({ output: this.outputs[index] })}
      </div>
    ));
  }
}
