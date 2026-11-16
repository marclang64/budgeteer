const KEY = 'budgeteer-demo-v1';
export function readBudget() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch { return {}; }
}
export function saveBudget(value) {
  localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new Event('budgeteer-data-changed'));
}
export function resetBudget() { localStorage.removeItem(KEY); window.dispatchEvent(new Event('budgeteer-data-changed')); }
