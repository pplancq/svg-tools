import { AbstractObserver } from '../AbstractObserver/AbstractObserver';
import { Container } from '../Container/Container';
import type { SanitizeConfig } from '../SanitizeConfig/SanitizeConfig';
import { SvgFetcher } from '../SvgFetcher/SvgFetcher';
import type { SvgFetcherInterface } from '../SvgFetcher/SvgFetcherInterface';
import { SvgInlineDecoder } from '../SvgInlineDecoder/SvgInlineDecoder';
import type { SvgInlineDecoderInterface } from '../SvgInlineDecoder/SvgInlineDecoderInterface';
import { SvgMerger } from '../SvgMerger/SvgMerger';
import type { SvgMergerInterface } from '../SvgMerger/SvgMergerInterface';
import { SvgSanitizer } from '../SvgSanitizer/SvgSanitizer';
import type { SvgSanitizerInterface } from '../SvgSanitizer/SvgSanitizerInterface';
import { SvgSourceResolver } from '../SvgSourceResolver/SvgSourceResolver';
import type { SvgSourceResolverInterface } from '../SvgSourceResolver/SvgSourceResolverInterface';
import { SvgValidator } from '../SvgValidator/SvgValidator';
import type { SvgValidatorInterface } from '../SvgValidator/SvgValidatorInterface';
import type { SvgState, SvgStoreInterface } from './SvgStoreInterface';

export class SvgStore extends AbstractObserver implements SvgStoreInterface {
  private state: SvgState = Object.freeze({ status: 'idle', svgElement: null, error: null });

  private readonly sourceResolver: SvgSourceResolverInterface;

  private readonly inlineDecoder: SvgInlineDecoderInterface;

  private readonly fetcher: SvgFetcherInterface;

  private readonly validator: SvgValidatorInterface;

  private readonly sanitizer: SvgSanitizerInterface;

  private readonly merger: SvgMergerInterface;

  constructor(
    private readonly src: string | URL,
    private readonly svgElement?: SVGSVGElement,
    private readonly sanitizeConfig?: SanitizeConfig,
  ) {
    super();
    this.sourceResolver = Container.get(SvgSourceResolver);
    this.inlineDecoder = Container.get(SvgInlineDecoder);
    this.fetcher = Container.get(SvgFetcher);
    this.validator = Container.get(SvgValidator);
    this.sanitizer = Container.get(SvgSanitizer);
    this.merger = Container.get(SvgMerger);

    queueMicrotask(() => {
      this.pipeline();
    });
  }

  getSvgResult(): SvgState {
    return this.state;
  }

  private async pipeline(): Promise<void> {
    this.setState({ status: 'loading', svgElement: null, error: null });

    try {
      const svgString = this.sourceResolver.isInline(this.src)
        ? this.inlineDecoder.decode(this.src as string)
        : await this.fetcher.fetch(this.src);

      this.validator.validate(svgString);

      const sanitizedEl = this.sanitizer.sanitize(svgString, this.sanitizeConfig);
      const targetEl = this.svgElement ?? document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      this.setState({ status: 'success', svgElement: this.merger.merge(sanitizedEl, targetEl), error: null });
    } catch (error) {
      this.setState({
        status: 'error',
        svgElement: null,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  private setState(state: SvgState): void {
    this.state = Object.freeze(state);
    this.notifyObservers();
  }
}
