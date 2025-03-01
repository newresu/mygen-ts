import { myModule } from '.';

import { describe, expect } from 'vitest';

describe('test myModule', () => {
  it('should return 42', () => {
    expect(myModule()).toBe(42);
  });
});
