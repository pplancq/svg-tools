import { CONTENT_TYPE, MINE_TYPE_SVG } from './constants';
import { ContentSvgError } from './Error/ContentSvgError';
import { InvalidSvgError } from './Error/InvalidSvgError';

const isValidSvg = (svgData: string): boolean => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgData, MINE_TYPE_SVG);

  return !!svgDoc.querySelector('svg');
};

const inFlightRequests: Map<string, Promise<string>> = new Map();

const fetchPromise = async (path: string | URL): Promise<string> => {
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

export const fetchSvg = async (path: string | URL): Promise<string> => {
  const inFlightKey = path instanceof URL ? path.toString() : path;

  if (inFlightRequests.has(inFlightKey)) {
    return inFlightRequests.get(inFlightKey) as Promise<string>;
  }

  const promise = fetchPromise(path).finally(() => {
    inFlightRequests.delete(inFlightKey);
  });

  inFlightRequests.set(inFlightKey, promise);

  return promise;
};
