import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function onChange(event) {
    setValue(event.target.value);
  }

  return [value, onChange, setValue];
}

export default useInput;
