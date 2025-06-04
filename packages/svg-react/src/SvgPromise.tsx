import { mergeSvgContent } from '@pplancq/svg-core';
import { type SVGProps, type Usable, use, useImperativeHandle, useLayoutEffect, useRef } from 'react';

export const SvgPromise = <T extends SVGSVGElement>({
  svgPromise,
  ref,
  ...props
}: { svgPromise: Usable<T> } & SVGProps<SVGSVGElement>) => {
  const svgRef = useRef<T>(null);
  useImperativeHandle(ref, () => svgRef.current as T);

  const svg = use<T>(svgPromise);

  useLayoutEffect(() => {
    const svgEl = svgRef.current as SVGSVGElement;

    mergeSvgContent(svg, svgEl);
  }, [svg]);

  return <svg {...props} ref={svgRef} />;
};
