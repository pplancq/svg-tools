import { getSvg } from '@pplancq/svg-core';
import { type SVGProps, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { useSafeState } from './useSafeState';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'aria-busy'> & {
  src: string;
  alt?: string;
};

export const Svg = ({ src, alt, ref, ...props }: SvgProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  useImperativeHandle(ref, () => svgRef.current as SVGSVGElement);
  const [hasError, setHasError] = useSafeState(false);

  useLayoutEffect(() => {
    if (hasError) {
      setHasError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (hasError || !svg) {
      return;
    }

    getSvg(src, svg)
      .then(result => {
        result.setAttribute('aria-busy', 'false');
      })
      .catch(() => {
        setHasError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, src]);

  if (hasError) {
    return alt ? <span>{alt}</span> : null;
  }

  return <svg {...props} ref={svgRef} aria-label={props['aria-label'] || alt} aria-busy />;
};

Svg.displayName = 'Svg';
