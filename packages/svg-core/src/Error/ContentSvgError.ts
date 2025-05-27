export class ContentSvgError extends Error {
  constructor(message: string = 'The content of the file is not a valid SVG') {
    super(message);
    this.name = 'ContentSvgError';
  }
}
