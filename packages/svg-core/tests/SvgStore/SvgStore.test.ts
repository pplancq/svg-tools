import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Container } from '../../src/Container/Container';
import { CONTENT_TYPE, MINE_TYPE_SVG } from '../../src/constants';
import { InvalidSvgError } from '../../src/Error/InvalidSvgError';
import { SvgStore } from '../../src/SvgStore/SvgStore';
import type { SvgState } from '../../src/SvgStore/SvgStoreInterface';

const svg =
  '<svg width="100" height="100" fill="red" stroke="green" stroke-width="4"><circle cx="50" cy="50" r="40"/></svg>';
const svgInlineURI = `data:${MINE_TYPE_SVG},${encodeURIComponent(svg)}`;
const svgInlineBase64 = `data:${MINE_TYPE_SVG};base64,${btoa(svg)}`;

const waitForResult = (store: SvgStore): Promise<SvgState> =>
  new Promise((resolve, reject) => {
    const current = store.getSvgResult();
    if (current.status === 'success') {
      resolve(current);
      return;
    }
    if (current.status === 'error') {
      reject(current.error);
      return;
    }
    const unsubscribe = store.subscribe(() => {
      const state = store.getSvgResult();
      if (state.status === 'success') {
        unsubscribe();
        resolve(state);
      } else if (state.status === 'error') {
        unsubscribe();
        reject(state.error);
      }
    });
  });

describe('SvgStore', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  beforeEach(() => {
    fetchMock.mockClear();
  });

  afterEach(() => {
    Container.clear();
  });

  describe('getSvgResult', () => {
    it('should start with idle state', () => {
      const store = new SvgStore('/icon.svg');
      expect(store.getSvgResult()).toStrictEqual({ status: 'idle', svgElement: null, error: null });
    });

    it('should return an SVGSVGElement from a URL', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
        text: () => Promise.resolve(svg),
      });

      const store = new SvgStore('/icon.svg');
      const result = await waitForResult(store);

      expect(result.status).toBe('success');
      expect(result.svgElement).not.toBeNull();
      expect(result.svgElement?.innerHTML).toStrictEqual('<circle cx="50" cy="50" r="40"></circle>');
    });

    it('should return an SVGSVGElement from an inline URI-encoded data URI', async () => {
      const store = new SvgStore(svgInlineURI);
      const result = await waitForResult(store);

      expect(fetchMock).not.toHaveBeenCalled();
      expect(result.svgElement?.innerHTML).toStrictEqual('<circle cx="50" cy="50" r="40"></circle>');
    });

    it('should return an SVGSVGElement from an inline base64 data URI', async () => {
      const store = new SvgStore(svgInlineBase64);
      const result = await waitForResult(store);

      expect(fetchMock).not.toHaveBeenCalled();
      expect(result.svgElement?.innerHTML).toStrictEqual('<circle cx="50" cy="50" r="40"></circle>');
    });

    it('should merge attributes into a provided SVGSVGElement', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
        text: () => Promise.resolve(svg),
      });

      const target = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      target.setAttribute('fill', '#fff');
      target.setAttribute('height', '60');

      const store = new SvgStore('/icon.svg', target);
      const result = await waitForResult(store);

      expect(result.svgElement).toHaveAttribute('fill', '#fff');
      expect(result.svgElement).toHaveAttribute('height', '60');
    });

    it('should set state to error when fetch returns non-SVG content-type', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers(),
        text: () => Promise.resolve('foo'),
      });

      const store = new SvgStore('/not-svg.html');
      await expect(waitForResult(store)).rejects.toThrow(InvalidSvgError);

      const state = store.getSvgResult();
      expect(state.status).toBe('error');
      expect(state.error).toBeInstanceOf(InvalidSvgError);
    });

    it('should allow custom sanitize config', async () => {
      const svgWithAnimation =
        '<svg><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"/></svg>';
      fetchMock.mockResolvedValueOnce({
        headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
        text: () => Promise.resolve(svgWithAnimation),
      });

      const store = new SvgStore('/icon.svg', undefined, {
        allowTags: ['animateTransform'],
        allowAttributes: ['from', 'to', 'dur', 'repeatCount'],
      });
      const result = await waitForResult(store);

      expect(result.svgElement?.innerHTML).toContain('animateTransform');
    });
  });

  describe('state transitions', () => {
    it('should transition from idle → loading → success', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
        text: () => Promise.resolve(svg),
      });

      const statuses: string[] = [];
      statuses.push(/* idle at construction */ 'idle');

      const store = new SvgStore('/icon.svg');
      store.subscribe(() => statuses.push(store.getSvgResult().status));

      await waitForResult(store);

      expect(statuses).toStrictEqual(['idle', 'loading', 'success']);
    });

    it('should transition from idle → loading → error on failure', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers(),
        text: () => Promise.resolve('foo'),
      });

      const statuses: string[] = [];
      statuses.push('idle');

      const store = new SvgStore('/not-svg.html');
      store.subscribe(() => statuses.push(store.getSvgResult().status));

      await expect(waitForResult(store)).rejects.toThrow();

      expect(statuses).toStrictEqual(['idle', 'loading', 'error']);
    });
  });

  describe('subscribe', () => {
    it('should notify observers on each state change', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
        text: () => Promise.resolve(svg),
      });

      const store = new SvgStore('/icon.svg');
      const notifications: string[] = [];
      store.subscribe(() => notifications.push(store.getSvgResult().status));

      await waitForResult(store);

      expect(notifications).toStrictEqual(['loading', 'success']);
    });

    it('should notify observers with loading then error on failure', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers(),
        text: () => Promise.resolve('foo'),
      });

      const store = new SvgStore('/not-svg.html');
      const notifications: string[] = [];
      store.subscribe(() => notifications.push(store.getSvgResult().status));

      await expect(waitForResult(store)).rejects.toThrow();

      expect(notifications).toStrictEqual(['loading', 'error']);
    });

    it('should stop notifying after unsubscribe', async () => {
      fetchMock.mockResolvedValueOnce({
        headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
        text: () => Promise.resolve(svg),
      });

      const store = new SvgStore('/icon.svg');
      const observer = vi.fn();
      const unsubscribe = store.subscribe(observer);

      unsubscribe();
      await waitForResult(store);

      expect(observer).not.toHaveBeenCalled();
    });
  });
});
