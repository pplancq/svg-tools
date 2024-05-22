import { getSvg } from '@pplancq/svg-core';
import { type SVGProps, useLayoutEffect, useRef, useState } from 'react';

type SvgProps = SVGProps<SVGSVGElement> & {
  src: string;
  alt?: string;
};

export const Svg = ({ src, alt, ...props }: SvgProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hasError, setHasError] = useState(false);

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
  }, [hasError, src]);

  if (hasError) {
    return alt ? <span>{alt}</span> : null;
  }

  return <svg {...props} ref={svgRef} />;
};
