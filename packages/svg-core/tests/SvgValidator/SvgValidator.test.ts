import { describe, expect, it } from 'vitest';

import { ContentSvgError } from '../../src/Error/ContentSvgError';
import { SvgValidator } from '../../src/SvgValidator/SvgValidator';

describe('SvgValidator', () => {
  const validator = new SvgValidator();

  it('should not throw for a valid SVG string', () => {
    expect(() => validator.validate('<svg><circle cx="50" cy="50" r="40"/></svg>')).not.toThrow();
  });

  it('should throw ContentSvgError for a non-SVG HTML string', () => {
    expect(() => validator.validate('<div>not an svg</div>')).toThrow(ContentSvgError);
  });

  it('should throw ContentSvgError for an empty string', () => {
    expect(() => validator.validate('')).toThrow(ContentSvgError);
  });

  it('should throw ContentSvgError for plain text', () => {
    expect(() => validator.validate('hello world')).toThrow(ContentSvgError);
  });
});
