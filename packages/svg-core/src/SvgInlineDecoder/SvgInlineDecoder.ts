import type { SvgInlineDecoderInterface } from './SvgInlineDecoderInterface';

export class SvgInlineDecoder implements SvgInlineDecoderInterface {
  // eslint-disable-next-line class-methods-use-this
  decode(src: string): string {
    const svgEncoded = src.substring(src.indexOf(',') + 1);

    return src.includes('base64') ? atob(svgEncoded) : decodeURIComponent(svgEncoded);
  }
}
