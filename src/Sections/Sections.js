import { computeMainClaim } from "./Logic/MainClaim/MainClaim";
import { computeAllClaims } from "./Logic/AllClaims/AllClaims";
import { computePoliticalSpectrum } from "./Logic/PoliticalSpectrum/PoliticalSpectrum";
import { DrawMainClaim } from "./Graphic/MainClaim/MainClaim";
import { DrawAllClaims } from "./Graphic/AllClaims/AllClaims";
import { DrawPoliticalSpectrum } from "./Graphic/PoliticalSpectrum/PoliticalSpectrum";
import { computeTextQuality } from "./Logic/TextQuality/TextQuality";
import { DrawTextQuality } from "./Graphic/TextQuality/TextQuality";

const sections = [
  { name: "MainClaim", compute: computeMainClaim, draw: DrawMainClaim },
  { name: "AllClaims", compute: computeAllClaims, draw: DrawAllClaims },
  {
    name: "PoliticalSpectrum",
    compute: computePoliticalSpectrum,
    draw: DrawPoliticalSpectrum,
  },
  { name: "TextQuality", compute: computeTextQuality, draw: DrawTextQuality },
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
