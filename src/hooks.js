import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

// it's like useState, except one half of the state it returns is debounced by `delay` milliseconds
function useDebouncedState(initialState, delay = 300) {
  const [localState, setLocalState] = useState(initialState);
  const [debouncedState, setDebouncedState] = useState(initialState);

  const commitState = useCallback(
    debounce(value => {
      setDebouncedState(value);
    }, delay),
    [],
  );

  const handleChangeState = useCallback(
    value => {
      setLocalState(value);
      commitState(value);
    },
    [commitState],
  );

  return [[localState, debouncedState], handleChangeState];
}

export { useDebouncedState };
