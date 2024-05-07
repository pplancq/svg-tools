import { describe, expect, it } from 'vitest';
import { mergeAttributes } from '../src/mergeAttributes';

describe('mergeAttributes', () => {
  it('should have all attribues on destination', () => {
    const svgFrom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgFrom.setAttribute('fill', '#fff');
    svgFrom.setAttribute('height', '60');

    const svgTo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    mergeAttributes(svgFrom, svgTo);

    expect(svgTo).toHaveAttribute('fill', '#fff');
    expect(svgTo).toHaveAttribute('height', '60');
  });

  it('should have the attributes fill to keep on the destination', () => {
    const svgFrom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgFrom.setAttribute('fill', '#fff');
    svgFrom.setAttribute('height', '60');

    const svgTo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgTo.setAttribute('fill', '#f00');

    mergeAttributes(svgFrom, svgTo);

    expect(svgTo).toHaveAttribute('fill', '#f00');
    expect(svgTo).toHaveAttribute('height', '60');
  });
});
