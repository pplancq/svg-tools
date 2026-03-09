import { type SanitizeConfig, SvgStore } from '@pplancq/svg-core';
import { type PropsWithChildren, type SVGProps, useCallback, useMemo, useSyncExternalStore } from 'react';

type SvgContentProps = Omit<SVGProps<SVGSVGElement>, 'aria-busy'> & {
  src: string;
  alt?: string;
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
  ...(['presentation', 'none'].includes(role ?? '') ? {} : { 'aria-label': ariaLabel || alt, 'aria-busy': ariaBusy }),
});

export const SvgContent = ({ src, alt, role, sanitizeConfig, ...props }: PropsWithChildren<SvgContentProps>) => {
  const store = useMemo(() => new SvgStore(src, undefined, sanitizeConfig), [src, sanitizeConfig]);

  const state = useSyncExternalStore(
    useCallback(cb => store.subscribe(cb), [store]),
    () => store.getSvgResult(),
    () => store.getSvgResult(),
  );

  if (state.status === 'error') {
    throw state.error;
  }

  const isSuccess = state.status === 'success' && state.svgElement !== null;
  const ariaAttrs = setAriaAttributes({ role, alt, ariaLabel: props['aria-label'], ariaBusy: !isSuccess });

  if (isSuccess) {
    const sourceAttrs: Record<string, string> = {};
    state.svgElement!.getAttributeNames().forEach(attr => {
      sourceAttrs[attr] = state.svgElement!.getAttribute(attr)!;
    });

    return (
      <svg
        {...sourceAttrs}
        {...props}
        role={role}
        {...ariaAttrs}
        // Safe: content is pre-sanitized by DOMPurify via svg-core's SvgSanitizer
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: state.svgElement!.innerHTML }}
      />
    );
  }

  return <svg {...props} role={role} {...ariaAttrs} />;
};
