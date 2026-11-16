import { Page } from '@components/Layout/';
import SettingsForm from './SettingsForm';
import { BsCashCoin } from 'react-icons/bs';
const Settings = () => <Page title="Settings" actions={[{ type: 'link', url: '/budget', title: <BsCashCoin />, style: 'icon' }]}><SettingsForm /></Page>;
export default Settings;
