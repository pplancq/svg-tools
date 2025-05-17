import { create } from 'storybook/theming';

const brand = {
  brandTitle: 'svg-tools',
  brandUrl: 'https://pplancq.github.io/svg-tools/',
  brandTarget: '_self',
  fontBase: "'Nunito', sans-serif",
};

export const light = create({
  base: 'light',
  ...brand,

  // brandImage: '',
  colorPrimary: '#15161A', // var(--color-text-primary)
  colorSecondary: '#525252', // var(--color-text-secondary)

  // UI
  appBg: '#E1E2E6', // var(--color-background-surface)
  appContentBg: '#F0F1F3', // var(--color-background-body)
  appPreviewBg: '#F0F1F3', // var(--color-background-body)
  appBorderColor: '#D2D4DB', // var(--color-background-alt)
  appBorderRadius: 0,

  // Text colors
  textColor: '#15161A', // var(--color-text-primary)
  textMutedColor: '#525252', // var(--color-text-secondary)
  textInverseColor: '#7A7A7A', // var(--color-text-hint)

  // Toolbar default and active colors
  barTextColor: '#15161A', // var(--color-text-primary)
  barHoverColor: '#15161A', // var(--color-text-primary)
  barSelectedColor: '#15161A', // var(--color-text-primary)
  barBg: '#F0F1F3', // var(--color-background-body)

  // Form colors
  buttonBg: '#E1E2E6', // var(--color-background-surface)
  buttonBorder: '#D2D4DB', // var(--color-background-alt)
  inputBg: '#E1E2E6', // var(--color-background-surface)
  inputBorder: '#D2D4DB', // var(--color-background-alt)
  inputTextColor: '#15161A', // var(--color-text-primary)
  inputBorderRadius: 4, // var()
});
