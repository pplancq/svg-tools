import { sanitize } from 'dompurify';
import { fetchSvg } from './fetchSvg';
import { mergeAttributes } from './mergeAttributes';

export const getSvg = async (path: string | URL, svgElement?: SVGSVGElement): Promise<SVGSVGElement | null> => {
  const svgEl = svgElement || document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  try {
    const svg = await fetchSvg(path);

    mergeAttributes(svg, svgEl);
    svgEl.innerHTML = svg.innerHTML;

    sanitize(svgEl, {
      USE_PROFILES: { svg: true, svgFilters: true },
      IN_PLACE: true,
    });

    return svgEl;
  } catch (e) {
    return null;
  }
};
