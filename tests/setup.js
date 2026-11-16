import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

let transactionId = 0;
beforeEach(() => {
  localStorage.clear();
  transactionId = 0;
  Object.defineProperty(window.crypto, 'randomUUID', { configurable: true, value: () => `test-transaction-${++transactionId}` });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
