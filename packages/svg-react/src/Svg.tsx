import { getSvg, type SanitizeConfig } from '@pplancq/svg-core';
import { type PropsWithChildren, Suspense, type SVGProps } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { SvgPromise } from './SvgPromise';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'aria-busy'> & {
  src: string;
  alt?: string;
  /**
   * Optional sanitization configuration to customize sanitization behavior.
   *
   * ⚠️ **WARNING**: Only use with trusted SVG sources.
   * Improper configuration can introduce security vulnerabilities.
   *
   * @example
   * ```tsx
   * <Svg
   *   src="/spinner.svg"
   *   alt="Loading"
   *   sanitizeConfig={{
   *     allowTags: ['animateTransform', 'animate'],
   *     allowAttributes: ['to', 'from', 'dur', 'repeatCount'],
   *   }}
   * />
   * ```
   */
  sanitizeConfig?: SanitizeConfig;
};

const setAriaAttributes = ({
  role,
  alt,
  ariaLabel,
  ariaBusy,
}: {
  role?: string;
  alt?: string;
  ariaLabel?: string;
  ariaBusy?: boolean;
}) => ({
  ...(!['presentation', 'none'].includes(role ?? '') ? { 'aria-label': ariaLabel || alt, 'aria-busy': ariaBusy } : {}),
});

export const Svg = ({ src, alt, role, sanitizeConfig, ...props }: PropsWithChildren<SvgProps>) => {
  return (
    <ErrorBoundary fallback={alt ? <span>{alt}</span> : null} key={src}>
      <Suspense
        fallback={
          <svg
            {...props}
            role={role}
            {...setAriaAttributes({ role, alt, ariaLabel: props['aria-label'], ariaBusy: true })}
          />
        }
      >
        <SvgPromise
          svgPromise={getSvg(src, undefined, sanitizeConfig)}
          {...props}
          role={role}
          {...setAriaAttributes({ role, alt, ariaLabel: props['aria-label'], ariaBusy: false })}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

Svg.displayName = 'Svg';
