import { CONTENT_TYPE, MINE_TYPE_SVG } from '../constants';
import { InvalidSvgError } from '../Error/InvalidSvgError';
import type { SvgFetcherInterface } from './SvgFetcherInterface';

export class SvgFetcher implements SvgFetcherInterface {
  private readonly inFlightRequests: Map<string, Promise<string>> = new Map();

  async fetch(src: string | URL): Promise<string> {
    const key = src instanceof URL ? src.toString() : src;

    if (this.inFlightRequests.has(key)) {
      return this.inFlightRequests.get(key) as Promise<string>;
    }

    const promise = this.fetchSvg(src).finally(() => {
      this.inFlightRequests.delete(key);
    });

    this.inFlightRequests.set(key, promise);

    return promise;
  }

  // eslint-disable-next-line class-methods-use-this
  private async fetchSvg(src: string | URL): Promise<string> {
    const response = await fetch(src);

    if (response.headers.get(CONTENT_TYPE) !== MINE_TYPE_SVG) {
      throw new InvalidSvgError();
    }

    return response.text();
  }
}
