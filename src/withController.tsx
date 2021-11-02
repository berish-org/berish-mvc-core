import React from 'react';
import { Controller, ControllerClass, setView, View } from './component';

export type WithControllerModelInstance = object | (() => object);

export function withController<TProps>(Component: React.ComponentClass<TProps> | React.FunctionComponent<TProps>): ControllerClass<TProps> {
  class HocViewClass extends View<HocControllerClass> {
    render() {
      return <Component {...this.props} />;
    }
  }
  class HocControllerClass extends Controller<TProps, {}> {}

  setView(HocViewClass)(HocControllerClass);
  return HocControllerClass;
}
