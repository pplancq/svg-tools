import type { SanitizeConfig } from '../SanitizeConfig/SanitizeConfig';

export interface SvgSanitizerInterface {
  sanitize(svgString: string, config?: SanitizeConfig): SVGSVGElement;
}
