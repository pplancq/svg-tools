import { CONTENT_TYPE, MINE_TYPE_SVG } from './constants';
import { ContentSvgError } from './Error/ContentSvgError';
import { InvalidSvgError } from './Error/InvalidSvgError';

const isValidSvg = (svgData: string): boolean => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgData, MINE_TYPE_SVG);

  return !!svgDoc.querySelector('svg');
};

export const fetchSvg = async (path: string | URL): Promise<string> => {
  const response = await fetch(path);

  if (response.headers.get(CONTENT_TYPE) !== MINE_TYPE_SVG) {
    throw new InvalidSvgError();
  }

  const svgData = await response.text();

  if (isValidSvg(svgData)) {
    return svgData;
  }

  throw new ContentSvgError();
};
