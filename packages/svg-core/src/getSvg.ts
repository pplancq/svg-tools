import DOMPurify from 'dompurify';
import { fetchSvg } from './fetchSvg.js';
import { mergeAttributes } from './mergeAttributes.js';

export const getSvg = async (path: string | URL, svgElement?: SVGSVGElement): Promise<SVGSVGElement | null> => {
  const svgEl = svgElement || document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  try {
    const svgData = await fetchSvg(path);

    const parent = document.createElement('div');
    parent.innerHTML = DOMPurify.sanitize(svgData, {
      USE_PROFILES: { svg: true, svgFilters: true },
      IN_PLACE: true,
    });

    const svg = parent.firstChild as SVGSVGElement;

    mergeAttributes(svg, svgEl);
    svgEl.innerHTML = svg.innerHTML;

    return svgEl;
  } catch {
    return null;
  }
};
