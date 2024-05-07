export const mergeAttributes = (from: SVGSVGElement, to: SVGSVGElement): void => {
  const attributes = from.getAttributeNames();
  attributes.forEach(attribute => {
    if (to.hasAttribute(attribute)) {
      return;
    }
    to.setAttribute(attribute, from.getAttribute(attribute) as string);
  });
};
