import { useState } from 'react';

const GlobalProvide = (() => {
  let state;
  let setState;

  const useGlobalState = () => {
    if (!state || !setState) {
      [state, setState] = useState(0);
    }
    return [state, setState];
  };

  return useGlobalState;
})();


export default GlobalProvide;