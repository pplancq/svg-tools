import { describe, expect, it } from 'vitest';
import { hello } from '../../src/hello/hello';

describe('hello', () => {
  it('should say hello', () => {
    const result = hello();

    expect(result).toStrictEqual('Hello World!');
  });
});
