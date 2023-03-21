import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@context/auth-context';
import App from './App';

import '@shared/styles/global/html.scss';
import '@shared/styles/global/reset.scss';
import '@shared/styles/global/normalize.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
	</React.StrictMode>
);
