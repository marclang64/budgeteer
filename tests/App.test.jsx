import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App';

describe('App Test', () => {
	it('renders headline', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			'Header'
		);
	});
});
