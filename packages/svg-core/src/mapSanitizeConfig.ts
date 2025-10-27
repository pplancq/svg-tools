import type { Config } from 'dompurify';

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

/**
 * Maps SanitizeConfig to DOMPurify configuration.
 *
 * @param {SanitizeConfig} sanitizeConfig - The sanitization configuration to map.
 *
 * @returns {Config} - The DOMPurify configuration object.
 */
export const mapSanitizeConfig = (sanitizeConfig: SanitizeConfig = {}): Config => {
  const config: Config = {
    USE_PROFILES: { svg: true, svgFilters: true },
    IN_PLACE: true,
  };

  if (sanitizeConfig.allowTags) {
    config.ADD_TAGS = sanitizeConfig.allowTags;
  }
  if (sanitizeConfig.allowAttributes) {
    config.ADD_ATTR = sanitizeConfig.allowAttributes;
  }
  if (sanitizeConfig.forbidTags) {
    config.FORBID_TAGS = sanitizeConfig.forbidTags;
  }
  if (sanitizeConfig.forbidAttributes) {
    config.FORBID_ATTR = sanitizeConfig.forbidAttributes;
  }
  if (sanitizeConfig.allowDataAttributes) {
    config.ALLOW_DATA_ATTR = sanitizeConfig.allowDataAttributes;
  }

  return config;
};
