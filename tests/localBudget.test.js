import { describe, expect, it, vi } from 'vitest';
import { readBudget, saveBudget, resetBudget } from '../src/utils/localBudget';

describe('local budget storage', () => {
  it('starts empty', () => expect(readBudget()).toEqual({}));

  it('saves and restores budget data and notifies the UI', () => {
    const listener = vi.fn();
    window.addEventListener('budgeteer-data-changed', listener);
    const budget = { defaultIncome: 5000, budget: { '2026': { '11': { transactions: { a: { name: 'Lunch', value: 12.75 } } } } } };
    saveBudget(budget);
    expect(readBudget()).toEqual(budget);
    expect(listener).toHaveBeenCalledOnce();
    window.removeEventListener('budgeteer-data-changed', listener);
  });

  it('handles malformed or unexpected stored values safely', () => {
    localStorage.setItem('budgeteer-demo-v1', '{invalid');
    expect(readBudget()).toEqual({});
    localStorage.setItem('budgeteer-demo-v1', '[]');
    expect(readBudget()).toEqual({});
    localStorage.setItem('budgeteer-demo-v1', 'null');
    expect(readBudget()).toEqual({});
  });

  it('resets stored budgets and notifies the UI', () => {
    saveBudget({ defaultIncome: 100 });
    const listener = vi.fn();
    window.addEventListener('budgeteer-data-changed', listener);
    resetBudget();
    expect(readBudget()).toEqual({});
    expect(listener).toHaveBeenCalledOnce();
    window.removeEventListener('budgeteer-data-changed', listener);
  });
});
