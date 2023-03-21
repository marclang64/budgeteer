import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from '../src/components/Greeting';

describe('Greeting component', () => {
	it('renders "Changed!" if the button was clicked', async () => {
		// Arrange
		render(<Greeting />);

		// Act
		const user = userEvent.setup();
		await user.click(screen.getByRole('button'));

		// Assert
		expect(screen.getByText('Changed!')).toBeInTheDocument();
	});
});
