import DOMPurify from 'dompurify';
import { MINE_TYPE_SVG } from './constants';
import { fetchSvg } from './fetchSvg';
import { mergeSvgContent } from './mergeSvgContent';

/**
 * Retrieves an SVG element from a given path or URL, sanitizes it, and merges its attributes with an optional SVG element.
 *
 * @param {string | URL} path - The path or URL to the SVG file or data URI.
 * @param {SVGSVGElement} [svgElement] - An optional SVG element to merge attributes into.
 *
 * @returns {Promise<SVGSVGElement>} - A promise that resolves to the SVG element.
 *
 * @throws {InvalidSvgError} - If the fetched content is not a valid SVG.
 * @throws {ContentSvgError} - If the content of the SVG file is not valid.
 */
export const getSvg = async (path: string | URL, svgElement?: SVGSVGElement): Promise<SVGSVGElement> => {
  const svgEl = svgElement || document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  let svgData: string;
  if (typeof path === 'string' && path.startsWith(`data:${MINE_TYPE_SVG}`)) {
    const svgEncoded = path.substring(path.indexOf(',') + 1);
    svgData = path.includes('base64') ? atob(svgEncoded) : decodeURIComponent(svgEncoded);
  } else {
    svgData = await fetchSvg(path);
  }

  const parent = document.createElement('div');
  parent.innerHTML = DOMPurify.sanitize(svgData, {
    USE_PROFILES: { svg: true, svgFilters: true },
    IN_PLACE: true,
  });

  const svg = parent.firstChild as SVGSVGElement;

  return mergeSvgContent(svg, svgEl);
};
