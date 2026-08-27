// @vitest-environment node
import { describe, expect, it } from "vitest";

import { MINE_TYPE_SVG } from "../../src/constants";
import { SvgStore } from "../../src/SvgStore/SvgStore";

const svg = '<svg width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>';
const svgInlineURI = `data:${MINE_TYPE_SVG},${encodeURIComponent(svg)}`;

describe("SvgStore (server environment)", () => {
  it("should instantiate without DOM APIs", () => {
    const store = new SvgStore(svgInlineURI);

    expect(store.getSvgResult()).toStrictEqual({ status: "idle", svgElement: null, error: null });
  });

  it("should not start the pipeline on the server", async () => {
    const store = new SvgStore(svgInlineURI);

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    expect(store.getSvgResult()).toStrictEqual({ status: "idle", svgElement: null, error: null });
  });
});
