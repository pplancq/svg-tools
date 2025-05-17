export default {
  extends: ['@pplancq/stylelint-config', '@pplancq/stylelint-config/prettier'],
  rules: {
    'selector-class-pattern': [
      // official bem regex
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true,
        message: selectorValue =>
          `Expected class selector "${selectorValue.trim()}" to match BEM CSS pattern https://en.bem.info/methodology/css.`,
      },
    ],
  },
};
