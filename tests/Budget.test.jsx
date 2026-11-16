import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Budget from '../src/pages/Budget/Budget';
import { readBudget, saveBudget } from '../src/utils/localBudget';

const renderBudget = () => render(<MemoryRouter><Budget /></MemoryRouter>);
const setInput = (name, value) => fireEvent.change(document.querySelector(`input[name="${name}"]`), { target: { value } });
const currentPeriod = () => ({ year: String(new Date().getFullYear()), month: String(new Date().getMonth() + 1).padStart(2, '0') });

const add = (name, value) => {
  setInput('name', name);
  setInput('value', value);
  fireEvent.click(screen.getByRole('button', { name: /add/i }));
};

describe('budget page', () => {
  it('calculates balances using cents, not truncated integers', () => {
    const { year, month } = currentPeriod();
    saveBudget({ defaultIncome: 100, defaultOutgoing: 20.25, budget: { [year]: { [month]: { transactions: { lunch: { name: 'Lunch', value: 12.75 } } } } } });
    renderBudget();
    expect(screen.getByText('$67.00')).toBeInTheDocument();
    expect(screen.getByText('$ 12.75')).toBeInTheDocument();
  });

  it('adds and deletes a transaction and persists both changes', () => {
    const { year, month } = currentPeriod();
    renderBudget();
    add('Coffee', '4.50');
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$ 4.50')).toBeInTheDocument();
    expect(Object.values(readBudget().budget[year][month].transactions)).toEqual([{ name: 'Coffee', value: 4.5 }]);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Coffee' }));
    expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
    expect(Object.values(readBudget().budget[year][month].transactions)).toEqual([]);
  });

  it('keeps transactions separate between months', () => {
    const { year, month } = currentPeriod();
    renderBudget();
    add('Groceries', '15.25');
    const otherMonth = month === '01' ? '02' : '01';
    fireEvent.change(document.querySelector('select[name="month"]'), { target: { value: otherMonth } });
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    add('Books', '9.99');
    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(readBudget().budget[year][month].transactions).toBeDefined();
    expect(readBudget().budget[year][otherMonth].transactions).toBeDefined();
    fireEvent.change(document.querySelector('select[name="month"]'), { target: { value: month } });
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.queryByText('Books')).not.toBeInTheDocument();
  });

  it('updates monthly income and expenses without changing defaults', () => {
    const { year, month } = currentPeriod();
    saveBudget({ defaultIncome: 100, defaultOutgoing: 25 });
    renderBudget();
    setInput('income', '150.50');
    setInput('outgoing', '30.25');
    expect(screen.getByText('$120.25')).toBeInTheDocument();
    const stored = readBudget();
    expect(stored.defaultIncome).toBe(100);
    expect(stored.defaultOutgoing).toBe(25);
    expect(stored.budget[year][month]).toMatchObject({ income: 150.5, outgoing: 30.25 });
  });
});
