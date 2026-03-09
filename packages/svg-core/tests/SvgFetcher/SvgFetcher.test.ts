import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CONTENT_TYPE, MINE_TYPE_SVG } from '../../src/constants';
import { InvalidSvgError } from '../../src/Error/InvalidSvgError';
import { SvgFetcher } from '../../src/SvgFetcher/SvgFetcher';

const svg = '<svg><circle cx="50" cy="50" r="40"/></svg>';

describe('SvgFetcher', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should fetch and return SVG string', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const fetcher = new SvgFetcher();
    const result = await fetcher.fetch('/icon.svg');

    expect(result).toBe(svg);
  });

  it('should throw InvalidSvgError when content-type is not image/svg+xml', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, 'text/html']]),
      text: () => Promise.resolve('<html></html>'),
    });

    const fetcher = new SvgFetcher();
    await expect(fetcher.fetch('/not-svg.html')).rejects.toThrow(InvalidSvgError);
  });

  it('should deduplicate concurrent requests for the same URL', async () => {
    let resolveFirst!: (value: unknown) => void;
    const firstPromise = new Promise(resolve => {
      resolveFirst = resolve;
    });
    fetchMock.mockReturnValueOnce(firstPromise);

    const fetcher = new SvgFetcher();
    const p1 = fetcher.fetch('/icon.svg');
    const p2 = fetcher.fetch('/icon.svg');

    resolveFirst({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const [r1, r2] = await Promise.all([p1, p2]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(r1).toBe(svg);
    expect(r2).toBe(svg);
  });

  it('should not deduplicate requests across different instances', async () => {
    fetchMock.mockResolvedValue({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const fetcher1 = new SvgFetcher();
    const fetcher2 = new SvgFetcher();

    await fetcher1.fetch('/icon.svg');
    await fetcher2.fetch('/icon.svg');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('should accept a URL instance', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const fetcher = new SvgFetcher();
    const result = await fetcher.fetch(new URL('https://example.com/icon.svg'));

    expect(result).toBe(svg);
  });
});
