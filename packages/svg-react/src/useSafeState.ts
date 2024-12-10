import { type Dispatch, type SetStateAction, useCallback, useLayoutEffect, useRef, useState } from 'react';

export const useSafeState = <S>(initialState?: S): [S | undefined, Dispatch<SetStateAction<S | undefined>>] => {
  const [state, setState] = useState<S | undefined>(initialState);
  const isMounted = useRef<boolean>(false);

  useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeSate = useCallback<Dispatch<SetStateAction<S | undefined>>>(value => {
    if (isMounted.current) {
      setState(value);
    }
  }, []);

  return [state, setSafeSate];
};
