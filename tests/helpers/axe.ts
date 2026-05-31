import axe from 'axe-core';
import { expect } from 'vitest';

export async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: {
      // JSDOM cannot compute full visual contrast reliably.
      'color-contrast': { enabled: false },
    },
  });

  expect(results.violations).toHaveLength(0);
}
