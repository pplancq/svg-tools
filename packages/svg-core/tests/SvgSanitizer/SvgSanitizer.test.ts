import { describe, expect, it } from 'vitest';

import { SvgSanitizer } from '../../src/SvgSanitizer/SvgSanitizer';

describe('SvgSanitizer', () => {
  const sanitizer = new SvgSanitizer();

  it('should return an SVGSVGElement', () => {
    const result = sanitizer.sanitize('<svg><circle cx="50" cy="50" r="40"/></svg>');
    expect(result).toBeInstanceOf(SVGSVGElement);
  });

  it('should strip script tags by default', () => {
    const result = sanitizer.sanitize('<svg><script>alert("xss")</script><circle cx="50" cy="50" r="40"/></svg>');
    expect(result.innerHTML).not.toContain('script');
    expect(result.innerHTML).toContain('circle');
  });

  it('should allow additional tags when allowTags is provided', () => {
    const result = sanitizer.sanitize(
      '<svg><animateTransform attributeName="transform" from="0" to="360" dur="1s" repeatCount="indefinite"/></svg>',
      { allowTags: ['animateTransform'], allowAttributes: ['from', 'to', 'dur', 'repeatCount'] },
    );
    expect(result.innerHTML).toContain('animateTransform');
  });

  it('should forbid specific tags when forbidTags is provided', () => {
    const result = sanitizer.sanitize('<svg><circle cx="50" cy="50" r="40"/></svg>', { forbidTags: ['circle'] });
    expect(result.innerHTML).not.toContain('circle');
  });

  it('should forbid specific attributes when forbidAttributes is provided', () => {
    const result = sanitizer.sanitize('<svg><rect fill="red" width="100" height="100"/></svg>', {
      forbidAttributes: ['fill'],
    });
    expect(result.innerHTML).toContain('rect');
    expect(result.innerHTML).not.toContain('fill=');
  });

  it('should allow data attributes when allowDataAttributes is true', () => {
    const result = sanitizer.sanitize('<svg><rect data-custom="value" width="100" height="100"/></svg>', {
      allowDataAttributes: true,
    });
    expect(result.innerHTML).toContain('data-custom="value"');
  });
});
