import { useState, useCallback } from "react";

const useInput = (initialvalue = null) => {
  const [value, setValue] = useState(initialvalue);
  const handler = useCallback((e) => {
    e.preventDefault();
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
