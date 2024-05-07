import { CONTENT_TYPE, MINE_TYPE_SVG } from './constants.js';

const parseSvg = (svgData: string): SVGSVGElement | null => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgData, MINE_TYPE_SVG);

  return svgDoc.querySelector('svg');
};

export const fetchSvg = async (path: string | URL): Promise<SVGSVGElement> => {
  const response = await fetch(path);

  if (response.headers.get(CONTENT_TYPE) !== MINE_TYPE_SVG) {
    throw new Error('The file is not a valid SVG');
  }

  const svgData = await response.text();

  const svgElement = parseSvg(svgData);

  if (!svgElement) {
    throw new Error('The content of the file is not a valid SVG');
  }

  return svgElement;
};
