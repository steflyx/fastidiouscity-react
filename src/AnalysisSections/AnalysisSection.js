import "./AnalysisSection.css";
import { MainClaim } from "./MainClaim";

export const sectionTypes = ["mainClaim"];

const sectionTypesClasses = {
  mainClaim: MainClaim,
};

export class AnalysisSection {
  constructor(type) {
    if (!sectionTypes.includes(type)) {
      // eslint-disable-next-line no-throw-literal
      throw "This section type doesn't exist";
    }
    const Section = sectionTypesClasses[type];
    this.section = new Section();
  }

  async compute(input) {
    await this.section.compute(input);
  }

  draw(key) {
    return this.section.draw(key);
  }
}
