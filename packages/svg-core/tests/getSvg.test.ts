import { describe, expect, it, vi } from 'vitest';
import { getSvg } from '../src';
import { CONTENT_TYPE, MINE_TYPE_SVG } from '../src/constants';

const svg =
  '<svg width="100" height="100" fill="red" stroke="green" stroke-width="4"><circle cx="50" cy="50" r="40"/></svg>';

const svgInline = `data:${MINE_TYPE_SVG},${encodeURIComponent(svg)}`;

describe('getSvg', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  it('should have an svg', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const result = await getSvg('/foo.svg');

    expect(result).not.toBeNull();
    expect(result?.innerHTML).toStrictEqual('<circle r="40" cy="50" cx="50"></circle>');
  });

  it('should not have an svg', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers(),
      text: () => Promise.resolve('foo'),
    });

    const result = await getSvg('/foo.svg');

    expect(result).toBeNull();
  });

  it('should merge in my svg', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const svgFrom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgFrom.setAttribute('fill', '#fff');
    svgFrom.setAttribute('height', '60');

    const result = await getSvg('/foo.svg', svgFrom);

    expect(result).toHaveAttribute('fill', '#fff');
    expect(result).toHaveAttribute('height', '60');
  });

  it('should have an svg inline', async () => {
    const result = await getSvg(svgInline);

    expect(fetchMock).not.toBeCalled();

    expect(result).not.toBeNull();
    expect(result?.innerHTML).toStrictEqual('<circle r="40" cy="50" cx="50"></circle>');
  });
});
