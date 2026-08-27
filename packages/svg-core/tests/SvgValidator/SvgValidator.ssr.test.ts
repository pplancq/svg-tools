// @vitest-environment node
import { describe, expect, it } from "vitest";

import { SvgValidator } from "../../src/SvgValidator/SvgValidator";

describe("SvgValidator (server environment)", () => {
  const validator = new SvgValidator();

  it("should not throw for a valid SVG string when DOMParser is not available", () => {
    expect(() => validator.validate('<svg><circle cx="50" cy="50" r="40"/></svg>')).not.toThrow();
  });

  it("should skip validation for a non-SVG string when DOMParser is not available", () => {
    expect(() => validator.validate("<div>not an svg</div>")).not.toThrow();
  });
});
