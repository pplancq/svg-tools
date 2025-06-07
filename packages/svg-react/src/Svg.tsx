import { getSvg } from '@pplancq/svg-core';
import { type PropsWithChildren, Suspense, type SVGProps } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { SvgPromise } from './SvgPromise';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'aria-busy'> & {
  src: string;
  alt?: string;
};

export const Svg = ({ src, alt, ...props }: PropsWithChildren<SvgProps>) => {
  return (
    <ErrorBoundary fallback={alt ? <span>{alt}</span> : null} key={src}>
      <Suspense fallback={<svg {...props} aria-label={props['aria-label'] || alt} aria-busy />}>
        <SvgPromise svgPromise={getSvg(src)} {...props} aria-label={props['aria-label'] || alt} aria-busy={false} />
      </Suspense>
    </ErrorBoundary>
  );
};

Svg.displayName = 'Svg';
