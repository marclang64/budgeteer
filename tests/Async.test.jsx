import { render, screen } from '@testing-library/react';

import Async from '../src/components/Async';

describe('Async component', () => {
	it('renders posts if request succeeds', async () => {
		render(<Async />);

		const listItemElements = await screen.findAllByRole('listitem');
		expect(listItemElements).not.toHaveLength(0);
	});

	it('renders posts if request succeeds', async () => {
		window.fetch = vi.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: 'p1', title: 'First post' }],
		});
		render(<Async />);

		const listItemElements = await screen.findAllByRole('listitem');
		expect(listItemElements).not.toHaveLength(0);
	});
});
