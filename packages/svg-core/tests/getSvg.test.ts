import { describe, expect, it, vi } from 'vitest';
import { CONTENT_TYPE, MINE_TYPE_SVG } from '../src/constants';
import { InvalidSvgError } from '../src/Error/InvalidSvgError';
import { getSvg } from '../src/getSvg';

const svg =
  '<svg width="100" height="100" fill="red" stroke="green" stroke-width="4"><circle cx="50" cy="50" r="40"/></svg>';

const svgInlineURI = `data:${MINE_TYPE_SVG},${encodeURIComponent(svg)}`;
const svgInlineBase64 = `data:${MINE_TYPE_SVG};base64,${btoa(svg)}`;

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
    expect(result?.innerHTML).toStrictEqual('<circle cx="50" cy="50" r="40"></circle>');
  });

  it('should not have an svg', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers(),
      text: () => Promise.resolve('foo'),
    });

    await expect(getSvg('/foo.svg')).rejects.toThrow(InvalidSvgError);
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

  it('should have an svg inline URIComponent', async () => {
    const result = await getSvg(svgInlineURI);

    expect(fetchMock).not.toBeCalled();

    expect(result).not.toBeNull();
    expect(result?.innerHTML).toStrictEqual('<circle cx="50" cy="50" r="40"></circle>');
  });

  it('should have an svg inline base64', async () => {
    const result = await getSvg(svgInlineBase64);

    expect(fetchMock).not.toBeCalled();

    expect(result).not.toBeNull();
    expect(result?.innerHTML).toStrictEqual('<circle cx="50" cy="50" r="40"></circle>');
  });

  it('should have an svg inline encoded with encodeURI', async () => {
    const testSvg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z'/></svg>";
    const testSvgInlineURI = `data:${MINE_TYPE_SVG},${encodeURI(testSvg)}`;

    const result = await getSvg(testSvgInlineURI);

    expect(fetchMock).not.toBeCalled();
    expect(result?.innerHTML).toStrictEqual(
      '<path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path>',
    );
  });

  it('should allow custom tags when allowTags is provided', async () => {
    const svgWithAnimation =
      '<svg><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"/></svg>';
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgWithAnimation),
    });

    const result = await getSvg('/foo.svg', undefined, {
      allowTags: ['animateTransform'],
      allowAttributes: ['from', 'to', 'dur', 'repeatCount'],
    });

    expect(result?.innerHTML).toContain('animateTransform');
    expect(result?.innerHTML).toContain('from="0"');
    expect(result?.innerHTML).toContain('to="360"');
  });

  it('should forbid specific tags when forbidTags is provided', async () => {
    const svgWithCircle = '<svg><circle cx="50" cy="50" r="40"/></svg>';
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgWithCircle),
    });

    const result = await getSvg('/foo.svg', undefined, {
      forbidTags: ['circle'],
    });

    expect(result?.innerHTML).not.toContain('circle');
  });

  it('should forbid specific attributes when forbidAttributes is provided', async () => {
    const svgWithFill = '<svg><rect fill="red" width="100" height="100"/></svg>';
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgWithFill),
    });

    const result = await getSvg('/foo.svg', undefined, {
      forbidAttributes: ['fill'],
    });

    expect(result?.innerHTML).toContain('rect');
    expect(result?.innerHTML).not.toContain('fill=');
  });

  it('should allow data attributes when allowDataAttributes is true', async () => {
    const svgWithDataAttr = '<svg><rect data-custom="value" width="100" height="100"/></svg>';
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgWithDataAttr),
    });

    const result = await getSvg('/foo.svg', undefined, {
      allowDataAttributes: true,
    });

    expect(result?.innerHTML).toContain('data-custom="value"');
  });

  it('should work with inline SVG and custom config', async () => {
    const svgWithAnimation =
      '<svg><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"/></svg>';
    const svgInline = `data:${MINE_TYPE_SVG},${encodeURIComponent(svgWithAnimation)}`;

    const result = await getSvg(svgInline, undefined, {
      allowTags: ['animateTransform'],
      allowAttributes: ['from', 'to', 'dur', 'repeatCount'],
    });

    expect(fetchMock).not.toBeCalled();
    expect(result?.innerHTML).toContain('animateTransform');
  });
});
