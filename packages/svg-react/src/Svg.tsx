import { type SanitizeConfig } from '@pplancq/svg-core';
import { type PropsWithChildren, type SVGProps } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { SvgContent } from './SvgContent';

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

export const Svg = ({ src, alt, role, sanitizeConfig, ...props }: PropsWithChildren<SvgProps>) => {
  return (
    <ErrorBoundary fallback={alt ? <span>{alt}</span> : null} key={src}>
      <SvgContent src={src} alt={alt} role={role} sanitizeConfig={sanitizeConfig} {...props} />
    </ErrorBoundary>
  );
};
