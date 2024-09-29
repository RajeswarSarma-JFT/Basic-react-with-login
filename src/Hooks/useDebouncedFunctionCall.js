import { debounce } from 'lodash';
import { useCallback } from 'react';

const useDebouncedFunctionCall = (urlCallFunction) => {
  const debouncedFunctionCall = useCallback(
    debounce((params, resolve, reject) => {
      return urlCallFunction(params).then(resolve).catch(reject);
    }, 1000),
    [urlCallFunction]
  );

  return debouncedFunctionCall;
};

export default useDebouncedFunctionCall;
