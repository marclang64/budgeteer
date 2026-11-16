import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SettingsForm from '../src/pages/Settings/SettingsForm';
import { readBudget, saveBudget } from '../src/utils/localBudget';

describe('settings', () => {
  it('saves default income and expenses without deleting budgets', () => {
    saveBudget({ budget: { '2026': { '11': { transactions: {} } } } });
    render(<SettingsForm />);
    fireEvent.change(screen.getByLabelText('Monthly Income'), { target: { value: '5000.50' } });
    fireEvent.change(screen.getByLabelText('Monthly Expenses'), { target: { value: '2000.25' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(readBudget()).toMatchObject({ defaultIncome: 5000.5, defaultOutgoing: 2000.25, budget: { '2026': { '11': { transactions: {} } } } });
    expect(screen.getByRole('status')).toHaveTextContent('Settings updated successfully');
  });

  it('cancels reset when the user declines', () => {
    saveBudget({ defaultIncome: 99 });
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<SettingsForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Reset all demo data' }));
    expect(readBudget().defaultIncome).toBe(99);
  });

  it('deletes all demo data after confirmation', () => {
    saveBudget({ defaultIncome: 99, budget: { '2026': {} } });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<SettingsForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Reset all demo data' }));
    expect(readBudget()).toEqual({});
    expect(screen.getByLabelText('Monthly Income')).toHaveValue(0);
  });
});
