import { useEffect, useRef } from 'react';

export interface UseComponentDidUpdateParams<TProps> {
  componentDidUpdate?: (prevProps: TProps) => any;
  componentDidMount?: () => any;
  componentWillUnmount?: () => any;
}

export const useComponentLifecycle = <TProps>(props: TProps, params: UseComponentDidUpdateParams<TProps>) => {
  const hasMounted = useRef(false);
  const prevPropsRef = useRef(props);

  useEffect(() => {
    if (hasMounted.current && params.componentDidUpdate) {
      Promise.resolve(params.componentDidUpdate(prevPropsRef.current)).then(() => {
        prevPropsRef.current = props;
      });
    }
  }, [props]);

  useEffect(() => {
    if (params.componentDidMount) Promise.resolve(params.componentDidMount()).then(() => (hasMounted.current = true));
    else hasMounted.current = true;
    return () => {
      if (params.componentWillUnmount) params.componentWillUnmount();
    };
  }, []);
};
