import { useContext } from 'react';
import AuthContext from '@context/auth-context';

import { Page } from '@components/Layout/';
import SettingsForm from './SettingsForm';

import { AiOutlineLogout } from 'react-icons/ai';
import { BsCashCoin } from 'react-icons/bs';

const Settings = () => {
	const authCtx = useContext(AuthContext);

	return (
		<Page
			title="Settings"
			actions={[
				{
					type: 'link',
					url: '/budget',
					title: <BsCashCoin />,
					style: 'icon',
				},
				{
					type: 'link',
					url: '/logout',
					title: <AiOutlineLogout />,
					style: 'icon',
				},
			]}
		>
			<SettingsForm />
		</Page>
	);
};

export default Settings;
