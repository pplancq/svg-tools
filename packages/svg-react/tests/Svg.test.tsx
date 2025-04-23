import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Svg } from '../src';

const CONTENT_TYPE = 'content-type';

const MINE_TYPE_SVG = 'image/svg+xml';

const svgData =
  '<svg width="100" height="100" fill="red" stroke="green" stroke-width="4"><circle cx="50" cy="50" r="40" aria-label="circle"/></svg>';

describe('<Svg />', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  it('should render correctly', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgData),
    });

    render(<Svg src="/foo.svg" alt="foo" aria-hidden />);

    await waitFor(() => {
      const element = screen.getByLabelText('circle');
      expect(element).toBeInTheDocument();
    });
  });

  it('should have change on attribute aria-busy', async () => {
    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgData),
    });

    render(<Svg src="/foo.svg" aria-hidden aria-label="foo" />);
    const svg = screen.getByLabelText('foo');

    expect(svg).toHaveAttribute('aria-busy', 'true');

    await waitFor(() => {
      const element = screen.getByLabelText('circle');
      expect(element).toBeInTheDocument();
    });

    expect(svg).toHaveAttribute('aria-busy', 'false');
  });

  it('renders fallback when src not found', async () => {
    fetchMock.mockRejectedValue({
      headers: new Headers(),
      text: () => Promise.resolve('foo'),
    });

    render(<Svg src="/foo.svg" alt="foo" aria-hidden aria-label="test" />);

    await waitFor(() => {
      const element = screen.getByText('foo');
      expect(element).toBeInTheDocument();
    });
  });

  it('renders nothing when alt is not define and src fails to load', async () => {
    fetchMock.mockRejectedValueOnce({
      headers: new Headers(),
      text: () => Promise.resolve('foo'),
    });

    render(<Svg src="/foo.svg" aria-label="test" />);

    await waitFor(() => {
      const fallback = screen.queryByText('foo');
      expect(fallback).not.toBeInTheDocument();
    });
  });

  it('should reset hasError when src changes', async () => {
    fetchMock.mockRejectedValueOnce({
      headers: new Headers(),
      text: () => Promise.resolve('foo'),
    });

    const { rerender } = render(<Svg src="/foo.svg" alt="foo" />);

    await waitFor(() => {
      const fallback = screen.getByText('foo');
      expect(fallback).toBeInTheDocument();
    });

    fetchMock.mockResolvedValueOnce({
      headers: new Headers([[CONTENT_TYPE, MINE_TYPE_SVG]]),
      text: () => Promise.resolve(svgData),
    });

    rerender(<Svg src="/bar.svg" alt="bar" />);

    await waitFor(() => {
      const element = screen.getByLabelText('circle');
      expect(element).toBeInTheDocument();
    });
  });
});
