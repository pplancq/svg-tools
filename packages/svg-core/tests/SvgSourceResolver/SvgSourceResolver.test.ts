import { describe, expect, it } from 'vitest';

import { MINE_TYPE_SVG } from '../../src/constants';
import { SvgSourceResolver } from '../../src/SvgSourceResolver/SvgSourceResolver';

describe('SvgSourceResolver', () => {
  const resolver = new SvgSourceResolver();

  describe('isInline', () => {
    it('should return true for a URI-encoded data URI SVG', () => {
      const src = `data:${MINE_TYPE_SVG},${encodeURIComponent('<svg></svg>')}`;
      expect(resolver.isInline(src)).toBeTruthy();
    });

    it('should return true for a base64 data URI SVG', () => {
      const src = `data:${MINE_TYPE_SVG};base64,${btoa('<svg></svg>')}`;
      expect(resolver.isInline(src)).toBeTruthy();
    });

    it('should return false for an HTTP URL string', () => {
      expect(resolver.isInline('https://example.com/icon.svg')).toBeFalsy();
    });

    it('should return false for a relative path', () => {
      expect(resolver.isInline('/icons/icon.svg')).toBeFalsy();
    });

    it('should return false for a URL instance', () => {
      expect(resolver.isInline(new URL('https://example.com/icon.svg'))).toBeFalsy();
    });
  });
});
