import { mergeAttributes } from './mergeAttributes';

/**
 * Merge attributes and SVG content from a source SVG into a target SVG element.
 *
 * Copies attributes from `source` to `target` using `mergeAttributes` then replaces
 * the `target` markup by assigning `source.innerHTML`. This function mutates and
 * returns the supplied `target` element.
 *
 * @param source - SVGSVGElement whose attributes and children will be copied.
 * @param target - SVGSVGElement to receive attributes and children. This element is mutated.
 *
 * @returns The mutated `target` element (same reference).
 */
export const mergeSvgContent = (source: SVGSVGElement, target: SVGSVGElement): SVGSVGElement => {
  const result = target;
  mergeAttributes(source, result);
  result.innerHTML = source.innerHTML;

  return result;
};
