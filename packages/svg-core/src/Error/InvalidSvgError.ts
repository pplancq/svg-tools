export class InvalidSvgError extends Error {
  constructor(message: string = 'The file is not a valid SVG') {
    super(message);
    this.name = 'InvalidSvgError';
  }
}
