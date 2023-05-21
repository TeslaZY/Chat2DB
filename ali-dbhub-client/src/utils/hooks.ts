import { useCallback, useEffect, useRef, useState } from 'react';
import { addColorSchemeListener } from '@/components/Setting';

export function useDebounce<A extends any[]>(
  callback: (...args: A) => void,
  timeout: number,
) {
  const timer = useRef<any>();
  return useCallback<(...args: A) => void>(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = undefined;
      }
      timer.current = setTimeout(() => {
        callback(...args);
        timer.current = undefined;
      }, timeout);
    },
    [callback, timeout],
  );
}

export function useLogin() {
  const [isLogin, setIsLogin] = useState(1);
  return [isLogin];
}

export function useUpdateEffect(fn: Function, arr: any[]) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      fn();
    }
  }, arr);
}

export function useTheme() {
  const [currentColorScheme, setCurrentColorScheme] = useState(
    localStorage.getItem('theme'),
  );
  useEffect(() => {
    addColorSchemeListener(setCurrentColorScheme);
  }, []);
  return currentColorScheme;
}

export function useCanDoubleClick() {
  const count = useRef(0);
  return ({
    onClick,
    onDoubleClick,
  }: {
    onClick?: Function;
    onDoubleClick?: Function;
  }) => {
    count.current = count.current + 1;
    if (count.current == 2) {
      onDoubleClick && onDoubleClick();
      count.current = 0;
    } else {
      setTimeout(() => {
        if (count.current == 1) {
          onClick && onClick();
        }
        count.current = 0;
      }, 200);
    }
  };
}

export function useOnlyOnceTask(fn: Function) {
  const [isFirst, setIsFirst] = useState(true);
  const [lastData, setLastData] = useState<any>();
  if (isFirst) {
    setIsFirst(false);
    const lastData = fn();
    setLastData(lastData);
    return lastData;
  } else {
    return lastData;
  }
}

export function useDOMMounted<E = Element>(callback: (element: E) => (() => void) | undefined | void) {
  const resetRef = useRef<() => void>();
  const ref = useRef<E | null>(null);
  const onMounted = useCallback((e: E | null) => {
    if (e) {
      if (ref.current && e !== ref.current && resetRef.current) {
        resetRef.current();
      }
      resetRef.current = callback(e) || undefined;
    } else {
      if (resetRef.current) {
        resetRef.current();
        resetRef.current = undefined;
      }
    }
    ref.current = e;
  }, []);
  return [onMounted, ref] as [React.RefCallback<E>, React.RefObject<E>];
}
