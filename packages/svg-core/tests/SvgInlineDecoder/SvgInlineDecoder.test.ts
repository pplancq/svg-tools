import { describe, expect, it } from 'vitest';

import { MINE_TYPE_SVG } from '../../src/constants';
import { SvgInlineDecoder } from '../../src/SvgInlineDecoder/SvgInlineDecoder';

const svg = '<svg width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>';

describe('SvgInlineDecoder', () => {
  const decoder = new SvgInlineDecoder();

  it('should decode a URI-encoded data URI', () => {
    const src = `data:${MINE_TYPE_SVG},${encodeURIComponent(svg)}`;
    expect(decoder.decode(src)).toBe(svg);
  });

  it('should decode a base64 data URI', () => {
    const src = `data:${MINE_TYPE_SVG};base64,${btoa(svg)}`;
    expect(decoder.decode(src)).toBe(svg);
  });

  it('should decode a data URI encoded with encodeURI', () => {
    const testSvg = "<svg xmlns='http://www.w3.org/2000/svg'><path d='M15.54,11.29Z'/></svg>";
    const src = `data:${MINE_TYPE_SVG},${encodeURI(testSvg)}`;
    expect(decoder.decode(src)).toBe(testSvg);
  });
});
