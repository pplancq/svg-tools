import { afterEach, describe, expect, it, vi } from 'vitest';

import { Container } from '../../src/Container/Container';
import { SvgFetcher } from '../../src/SvgFetcher/SvgFetcher';
import { SvgValidator } from '../../src/SvgValidator/SvgValidator';

describe('Container', () => {
  afterEach(() => {
    Container.clear();
  });

  describe('get', () => {
    it('should return an instance of the given constructor', () => {
      const instance = Container.get(SvgFetcher);
      expect(instance).toBeInstanceOf(SvgFetcher);
    });

    it('should return the same instance on subsequent calls (singleton)', () => {
      const instance1 = Container.get(SvgFetcher);
      const instance2 = Container.get(SvgFetcher);
      expect(instance1).toBe(instance2);
    });

    it('should return different instances for different constructors', () => {
      const fetcher = Container.get(SvgFetcher);
      const validator = Container.get(SvgValidator);
      expect(fetcher).not.toBe(validator);
    });
  });

  describe('set', () => {
    it('should override the singleton with a custom instance', () => {
      const mockFetcher = { fetch: vi.fn() } as unknown as SvgFetcher;
      Container.set(SvgFetcher, mockFetcher);
      expect(Container.get(SvgFetcher)).toBe(mockFetcher);
    });
  });

  describe('clear', () => {
    it('should create a new instance after clear', () => {
      const instance1 = Container.get(SvgFetcher);
      Container.clear();
      const instance2 = Container.get(SvgFetcher);
      expect(instance1).not.toBe(instance2);
    });
  });
});
