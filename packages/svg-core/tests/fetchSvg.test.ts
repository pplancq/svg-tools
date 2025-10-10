import { describe, expect, it, vi } from 'vitest';
import { CONTENT_TYPE, MINE_TYPE_SVG } from '../src/constants';
import { ContentSvgError } from '../src/Error/ContentSvgError';
import { InvalidSvgError } from '../src/Error/InvalidSvgError';
import { fetchSvg } from '../src/fetchSvg';

const svg =
  '<svg width="100" height="100" fill="red" stroke="green" stroke-width="4"><circle cx="50" cy="50" r="40"/></svg>';

describe('fetchSvg', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  it('should have an svg', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });

    const result = await fetchSvg('/foo.svg');

    expect(result).toStrictEqual(svg);
  });

  it('should throw an error if the file is not a valid SVG', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers(),
      text: () => Promise.resolve('foo'),
    });

    await expect(fetchSvg('/foo.svg')).rejects.toThrow(InvalidSvgError);
  });

  it('should throw an error if the content of the file is not a valid SVG', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve('foo'),
    });

    await expect(fetchSvg('/foo.svg')).rejects.toThrow(ContentSvgError);
  });

  it('should deduplicate simultaneous fetches but not cache the result', async () => {
    fetchMock.mockResolvedValue({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });
    await Promise.all([fetchSvg('/foo.svg'), fetchSvg('/foo.svg')]);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    await fetchSvg('/foo.svg');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('should issue separate network requests for different paths', async () => {
    fetchMock.mockResolvedValue({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });
    await Promise.all([fetchSvg('/foo.svg'), fetchSvg('/bar.svg')]);

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('should deduplicate simultaneous requests and trigger a new fetch after resolution', async () => {
    fetchMock.mockResolvedValue({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svg),
    });
    await Promise.all([fetchSvg('/foo.svg'), fetchSvg('/foo.svg')]);

    await fetchSvg('/foo.svg');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
