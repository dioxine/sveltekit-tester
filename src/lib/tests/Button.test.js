import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button.svelte';

/*Exporting is required. Access to exported methods is going from rendered component*/
//Testing exported methods

describe('Testing exported methods:', () => {
	test('it exports a method', async () => {
		const { getByText, component } = render(Button);
		expect(component.increment).toBeDefined();
		const button = getByText(/Clicks:/);
		expect(button.innerHTML).toBe('Clicks: 0');
		await component.increment(); //Direct access to method
		expect(button.innerHTML).toBe('Clicks: 1');
	});
});

//Testing exported prop

describe('Testing exported prop:', () => {
	test('it defaults to 0', async () => {
		const { getByText } = render(Button);
		const button = getByText(/Clicks:/);
		expect(button.innerHTML).toBe('Clicks: 0');
	});

	test('it can have an initial value', async () => {
		const { getByText } = render(Button, { props: { count: 33 } }); //Setting here initial value
		const button = getByText(/Clicks:/);
		expect(button.innerHTML).toBe('Clicks: 33');
	});

	test('it can be updated', async () => {
		const { getByText, component } = render(Button);
		const button = getByText(/Clicks:/);
		expect(button.innerHTML).toBe('Clicks: 0');
		await component.$set({ count: 41 }); //Updating prop here
		expect(button.innerHTML).toBe('Clicks: 41');
	});
});

/* Emitting events using Jest's mock and Client-side component API (component.$on) */
//Testing emitted custom events with fireEvent method

describe('Testing emitted custom events fireEvent method:', () => {
	test('it emits an event', async () => {
		const { getByText, component } = render(Button);
		const button = getByText(/Clicks:/);
		let mockEvent = jest.fn();
		component.$on('countChanged', (event) => mockEvent(event.detail));
		await fireEvent.click(button);

		// Some examples on what to test
		expect(mockEvent).toHaveBeenCalled(); // to check if it's been called
		expect(mockEvent).toHaveBeenCalledTimes(1); // to check how any times it's been called
		expect(mockEvent).toHaveBeenLastCalledWith(1); // to check the content of the event

		await fireEvent.click(button);
		expect(mockEvent).toHaveBeenCalledTimes(2);
		expect(mockEvent).toHaveBeenLastCalledWith(2);
	});
});

//Testing emitted custom events with user-events library

describe('Testing emitted custom events user-events library:', () => {
	test('it emits an event', async () => {
		const { getByText, component } = render(Button);
		const button = getByText(/Clicks:/);
		let mockEvent = jest.fn();
		component.$on('countChanged', (event) => mockEvent(event.detail));
		await userEvent.click(button);
		expect(mockEvent).toHaveBeenCalled();
		expect(mockEvent).toHaveBeenCalledTimes(1);
		expect(mockEvent).toHaveBeenLastCalledWith(1);
	});
});
