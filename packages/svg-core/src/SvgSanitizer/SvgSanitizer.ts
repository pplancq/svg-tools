import DOMPurify, { type Config } from 'dompurify';

import type { SanitizeConfig } from '../SanitizeConfig/SanitizeConfig';
import type { SvgSanitizerInterface } from './SvgSanitizerInterface';

export class SvgSanitizer implements SvgSanitizerInterface {
  constructor(private readonly sanitizer: typeof DOMPurify = DOMPurify) {}

  sanitize(svgString: string, config?: SanitizeConfig): SVGSVGElement {
    const parent = document.createElement('div');
    parent.innerHTML = this.sanitizer.sanitize(svgString, this.mapConfig(config));

    return parent.firstChild as SVGSVGElement;
  }

  // eslint-disable-next-line class-methods-use-this
  private mapConfig(sanitizeConfig: SanitizeConfig = {}): Config {
    const config: Config = {
      USE_PROFILES: { svg: true, svgFilters: true },
      IN_PLACE: true,
    };

    if (sanitizeConfig.allowTags) {
      config.ADD_TAGS = sanitizeConfig.allowTags;
    }
    if (sanitizeConfig.allowAttributes) {
      config.ADD_ATTR = sanitizeConfig.allowAttributes;
    }
    if (sanitizeConfig.forbidTags) {
      config.FORBID_TAGS = sanitizeConfig.forbidTags;
    }
    if (sanitizeConfig.forbidAttributes) {
      config.FORBID_ATTR = sanitizeConfig.forbidAttributes;
    }
    if (sanitizeConfig.allowDataAttributes) {
      config.ALLOW_DATA_ATTR = sanitizeConfig.allowDataAttributes;
    }

    return config;
  }
}
