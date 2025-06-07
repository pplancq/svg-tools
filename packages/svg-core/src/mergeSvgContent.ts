import { mergeAttributes } from './mergeAttributes';

export const mergeSvgContent = (source: SVGSVGElement, target: SVGSVGElement): SVGSVGElement => {
  const result = target;
  mergeAttributes(source, result);
  result.innerHTML = source.innerHTML;

  return result;
};
