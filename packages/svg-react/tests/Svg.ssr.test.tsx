// @vitest-environment node
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Svg } from "../src/Svg";

describe("<Svg /> (server environment)", () => {
  it("should render an accessible placeholder svg without DOM APIs", () => {
    const view = renderToString(<Svg src="/foo.svg" alt="foo" />);

    expect(view).toContain("<svg");
    expect(view).toContain('aria-busy="true"');
    expect(view).toContain('aria-label="foo"');
  });

  it("should not render aria attributes when role is presentation", () => {
    const view = renderToString(<Svg src="/foo.svg" role="presentation" alt="foo" />);

    expect(view).toContain("<svg");
    expect(view).not.toContain("aria-busy");
    expect(view).not.toContain("aria-label");
  });
});
