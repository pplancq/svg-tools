export interface SvgFetcherInterface {
  fetch(src: string | URL): Promise<string>;
}
