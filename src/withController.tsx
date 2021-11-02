import React from 'react';
import { Controller, ControllerClass, setView } from './component';

export function withController<TProps>(Component: React.ComponentClass<TProps> | React.FunctionComponent<TProps>): ControllerClass<TProps> {
  class HocControllerClass extends Controller<TProps, {}> {}

  setView(Component)(HocControllerClass);
  return HocControllerClass;
}
