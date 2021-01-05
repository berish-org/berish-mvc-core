import React from 'react';
import { StatefulObject } from '@berish/stateful';
import { connect } from '@berish/stateful-react-connect';
import { Controller, ControllerClass, setView, View } from './component';

export type WithControllerModelInstance = StatefulObject<object> | (() => StatefulObject<object>);

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
        this.Component = connect(models, Component as React.FunctionComponent<TProps>);
        return prevConnectRenderView(component, models, RenderView);
      };
    }
  }

  setView(HocViewClass)(HocControllerClass);
  return HocControllerClass;
}
