// eslint-disable-next-line import-x/no-extraneous-dependencies
import concurrently from "concurrently";

const { result } = concurrently(["npm:lint:*(!fix)"], {
  prefixColors: "auto",
  maxProcesses: process.env.CI ? 1 : undefined,
});

result.then(
  () => process.exit(0),
  () => process.exit(1),
);
