import '@testing-library/jest-dom/extend-expect';
import debounce from 'lodash/debounce';

// THIS IS IMPORTANT:
// For the purpose of creating a more consistent testing setup,
// this mock will make the app always believe the date is November 21, 2019.
// For this to work well, make sure to use Date.now() throughout the app when calculating what "today" is.
// If you need to, you can overwrite this mock in your test, but make sure that
// you put it at the top of your file, otherwise you can't guarantee any of the dates
// haven't been initialized with this mock of Date.now instead of your own custom one.
Date.now = jest.fn(() => 1574359991399);
Date.prototype.getTimezoneOffset = () => 420;

// Globally mock lodash's debounce function since it's no fun to mock timers
jest.mock('lodash/debounce');
debounce.mockImplementation(fn => fn);
