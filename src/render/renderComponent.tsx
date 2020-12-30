import React, { PropsWithChildren, useContext, useMemo, useRef } from 'react';
import { connect } from '@berish/stateful-react-connect';

import { ControllerClass } from '../component';
import { onStartEmit, onStopEmit, onUpdatePropsEmit } from '../events/methods';
import { useComponentLifecycle, useForceUpdate } from '../hooks';
import { mvcControllerContext } from '../provider/mvcControllerContext';

import { RenderView } from './renderView';
import { createComponent } from './createComponent';

export interface RenderComponentProps {
  controllerClass: ControllerClass;
}

export function RenderComponent(propsInternal: PropsWithChildren<RenderComponentProps>) {
  const { controllerClass, ...props } = propsInternal;
  const mvcController = useContext(mvcControllerContext);

  const getPropsRef = useRef(() => props);
  const forceUpdate = useForceUpdate();

  const { controller, view, model, ConnectedView } = useMemo(() => {
    const { controller, view, model } = createComponent(
      mvcController,
      controllerClass,
      getPropsRef.current,
      forceUpdate,
    );
    const ConnectedView = connect([model], RenderView);

    return { controller, view, model, ConnectedView };
  }, [controllerClass, mvcController]);

  useComponentLifecycle(propsInternal, {
    componentDidMount: () => {
      Promise.all([onStartEmit(controller), onStartEmit(model), onStartEmit(view)]);
    },
    componentWillUnmount: () => {
      Promise.all([onStopEmit(controller), onStopEmit(model), onStopEmit(view)]);
    },
    componentDidUpdate: (prevPropsInternal) => {
      const { controllerClass, ...prevProps } = prevPropsInternal;
      getPropsRef.current = () => props;
      Promise.all([
        onUpdatePropsEmit(controller, prevProps),
        onUpdatePropsEmit(model, prevProps),
        onUpdatePropsEmit(view, prevProps),
      ]);
    },
  });

  return <ConnectedView view={view} />;
}
