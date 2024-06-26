import { getSvg } from '@pplancq/svg-core';
import { type SVGProps, useLayoutEffect, useRef } from 'react';
import { useSafeState } from './useSafeState.js';

type SvgProps = SVGProps<SVGSVGElement> & {
  src: string;
  alt?: string;
};

export const Svg = ({ src, alt, ...props }: SvgProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
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

    getSvg(src, svg).then(result => {
      if (!result) {
        setHasError(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, src]);

  if (hasError) {
    return alt ? <span>{alt}</span> : null;
  }

  return <svg {...props} ref={svgRef} aria-label={alt || props['aria-label']} />;
};
