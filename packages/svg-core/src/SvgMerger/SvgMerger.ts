import type { SvgMergerInterface } from './SvgMergerInterface';

export class SvgMerger implements SvgMergerInterface {
  merge(source: SVGSVGElement, target: SVGSVGElement): SVGSVGElement {
    this.mergeAttributes(source, target);
    // eslint-disable-next-line no-param-reassign
    target.innerHTML = source.innerHTML;

    return target;
  }

  // eslint-disable-next-line class-methods-use-this
  private mergeAttributes(from: SVGSVGElement, to: SVGSVGElement): void {
    const attributes = from.getAttributeNames();
    attributes.forEach(attribute => {
      if (to.hasAttribute(attribute)) {
        return;
      }
      to.setAttribute(attribute, from.getAttribute(attribute) as string);
    });
  }
}
