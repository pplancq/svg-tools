import DOMPurify from 'dompurify';
import { MINE_TYPE_SVG } from './constants';
import { fetchSvg } from './fetchSvg';
import { mergeAttributes } from './mergeAttributes';

export const getSvg = async (path: string | URL, svgElement?: SVGSVGElement): Promise<SVGSVGElement | null> => {
  const svgEl = svgElement || document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  try {
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

    mergeAttributes(svg, svgEl);
    svgEl.innerHTML = svg.innerHTML;

    return svgEl;
  } catch {
    return null;
  }
};
