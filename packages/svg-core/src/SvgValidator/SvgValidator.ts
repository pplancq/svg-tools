import { IS_SERVER, MINE_TYPE_SVG } from "../constants";
import { ContentSvgError } from "../Error/ContentSvgError";
import type { SvgValidatorInterface } from "./SvgValidatorInterface";

export class SvgValidator implements SvgValidatorInterface {
  private readonly parser?: DOMParser;

  constructor() {
    if (!IS_SERVER) {
      this.parser = new DOMParser();
    }
  }

  validate(svgString: string): void {
    if (!this.parser) {
      return;
    }

    const svgDoc = this.parser.parseFromString(svgString, MINE_TYPE_SVG);

    if (!svgDoc.querySelector("svg")) {
      throw new ContentSvgError();
    }
  }
}
