import { MINE_TYPE_SVG } from '../constants';
import type { SvgSourceResolverInterface } from './SvgSourceResolverInterface';

export class SvgSourceResolver implements SvgSourceResolverInterface {
  // eslint-disable-next-line class-methods-use-this
  isInline(src: string | URL): boolean {
    return typeof src === 'string' && src.startsWith(`data:${MINE_TYPE_SVG}`);
  }
}
