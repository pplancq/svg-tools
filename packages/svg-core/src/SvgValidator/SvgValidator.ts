import { MINE_TYPE_SVG } from '../constants';
import { ContentSvgError } from '../Error/ContentSvgError';
import type { SvgValidatorInterface } from './SvgValidatorInterface';

export class SvgValidator implements SvgValidatorInterface {
  constructor(private readonly parser: DOMParser = new DOMParser()) {}

  validate(svgString: string): void {
    const svgDoc = this.parser.parseFromString(svgString, MINE_TYPE_SVG);

    if (!svgDoc.querySelector('svg')) {
      throw new ContentSvgError();
    }
  }
}
