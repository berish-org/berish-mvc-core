import React from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, ControllerClass, setView, View } from './component';

export type WithControllerModelInstance = object | (() => object);

export function withController<TProps>(
  Component: React.ComponentClass<TProps> | React.FunctionComponent<TProps>,
): ControllerClass<TProps> {
  class HocViewClass extends View<HocControllerClass> {
    render() {
      return <this.controller.Component {...this.props} />;
    }
  }
  class HocControllerClass extends Controller<TProps, null, null> {
    Component = Component;

    onInitialize() {
      const prevConnectRenderView = this.renderConfig.connectRenderView;

      this.renderConfig.connectRenderView = (component, models, RenderView) => {
        this.Component = observer(Component as React.FunctionComponent<TProps>);
        return prevConnectRenderView(component, models, RenderView);
      };
    }
  }

  setView(HocViewClass)(HocControllerClass);
  return HocControllerClass;
}
