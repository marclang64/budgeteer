import { useState } from 'react';
import { readBudget, saveBudget, resetBudget } from '@utils/localBudget';
import { Form, Input, Button } from '@components/Form/';
import classes from './SettingsForm.module.scss';

const SettingsForm = () => {
  const [defaults, setDefaults] = useState(() => readBudget());
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setDefaults(previous => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const submit = event => {
    event.preventDefault();
    const next = {
      ...readBudget(),
      defaultIncome: Number(defaults.defaultIncome) || 0,
      defaultOutgoing: Number(defaults.defaultOutgoing) || 0,
    };
    saveBudget(next);
    setDefaults(next);
    setSaved(true);
  };

  const reset = () => {
    if (!window.confirm('Delete all locally saved budgets and settings?')) return;
    resetBudget();
    setDefaults(readBudget());
    setSaved(false);
  };

  return <div className={classes.settings}>
    <Form onSubmit={submit}>
      <div className={classes.fields}>
        <Input label="Monthly Income" type="number" min="0" step="0.01"
          value={defaults.defaultIncome ?? 0} onChange={event => update('defaultIncome', event.target.value)} required />
        <Input label="Monthly Expenses" type="number" min="0" step="0.01"
          value={defaults.defaultOutgoing ?? 0} onChange={event => update('defaultOutgoing', event.target.value)} required />
      </div>
      {saved && <p className={classes.message} role="status">Settings updated successfully</p>}
      <Button type="submit">Save</Button>
    </Form>
    <div className={classes.demoControls}>
      <p>Demo data is stored only in this browser.</p>
      <Button type="button" style="secondary" onClick={reset}>Reset all demo data</Button>
    </div>
  </div>;
};

export default SettingsForm;
