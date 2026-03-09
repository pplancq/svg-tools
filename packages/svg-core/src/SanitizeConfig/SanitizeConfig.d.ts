/**
 * Configuration options for SVG sanitization.
 *
 * @warning Only use these options with trusted SVG sources.
 * Improper configuration can introduce security vulnerabilities.
 */
export interface SanitizeConfig {
  /**
   * Additional tags to allow during sanitization.
   * Example: ['animateTransform', 'animate']
   */
  allowTags?: string[];

  /**
   * Additional attributes to allow during sanitization.
   * Example: ['to', 'from', 'dur', 'repeatCount']
   */
  allowAttributes?: string[];

  /**
   * Tags to forbid during sanitization.
   * Example: ['script', 'iframe']
   */
  forbidTags?: string[];

  /**
   * Attributes to forbid during sanitization.
   * Example: ['onerror', 'onclick']
   */
  forbidAttributes?: string[];

  /**
   * Allow data attributes (data-*).
   * Default: false
   */
  allowDataAttributes?: boolean;
}
