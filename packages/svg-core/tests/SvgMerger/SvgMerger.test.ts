import { describe, expect, it } from 'vitest';

import { SvgMerger } from '../../src/SvgMerger/SvgMerger';

const createSvg = (attributes: Record<string, string> = {}, innerHTML = ''): SVGSVGElement => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  el.innerHTML = innerHTML;
  return el;
};

describe('SvgMerger', () => {
  const merger = new SvgMerger();

  it('should copy innerHTML from source to target', () => {
    const source = createSvg({}, '<circle cx="50" cy="50" r="40"></circle>');
    const target = createSvg();
    const result = merger.merge(source, target);
    expect(result.innerHTML).toBe('<circle cx="50" cy="50" r="40"></circle>');
  });

  it('should copy attributes from source to target', () => {
    const source = createSvg({ width: '100', height: '100', fill: 'red' });
    const target = createSvg();
    const result = merger.merge(source, target);
    expect(result).toHaveAttribute('width', '100');
    expect(result).toHaveAttribute('height', '100');
    expect(result).toHaveAttribute('fill', 'red');
  });

  it('should not overwrite existing attributes on target', () => {
    const source = createSvg({ fill: 'red', width: '100' });
    const target = createSvg({ fill: '#fff', height: '60' });
    const result = merger.merge(source, target);
    expect(result).toHaveAttribute('fill', '#fff');
    expect(result).toHaveAttribute('width', '100');
    expect(result).toHaveAttribute('height', '60');
  });

  it('should return the target element (same reference)', () => {
    const source = createSvg();
    const target = createSvg();
    const result = merger.merge(source, target);
    expect(result).toBe(target);
  });
});
