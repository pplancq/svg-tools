import type { AbstractObserverInterface } from '../AbstractObserver/AbstractObserverInterface';

export type SvgStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SvgState {
  status: SvgStatus;
  svgElement: SVGSVGElement | null;
  error: Error | null;
}

export interface SvgStoreInterface extends AbstractObserverInterface {
  getSvgResult(): SvgState;
}
