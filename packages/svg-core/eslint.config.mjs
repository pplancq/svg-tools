import { defineConfig } from "@pplancq/eslint-config";

export default defineConfig({
  enableVitest: true,
  enablePrettier: "disableStyleOnly",
  rulesNaming: "modern",
  extendConfig: [
    {
      ignores: ["build"],
    },
    {
      files: ["*.config.ts", "*.config.mts"],
      rules: {
        "import-x/no-extraneous-dependencies": "off",
        "import-x/no-default-export": "off",
      },
    },
  ],
});
