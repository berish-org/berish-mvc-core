import React from 'react';
import { ControllerProvider } from '../component';
import { MvcComponent } from './createComponent';

export interface ComponentRenderConfig {
  renderComponent: (component: MvcComponent, props: { [key: string]: any }) => JSX.Element;

  onBeforeInitialize?: (component: MvcComponent) => void;
  onAfterInitialize?: (component: MvcComponent) => void;
  onBeforeStartEmit?: (component: MvcComponent) => void | Promise<void>;
  onAfterStartEmit?: (component: MvcComponent) => void | Promise<void>;
  onBeforeStopEmit?: (component: MvcComponent) => void | Promise<void>;
  onAfterStopEmit?: (component: MvcComponent) => void | Promise<void>;
  onBeforeUpdatePropsEmit?: (component: MvcComponent, prevProps: any) => void | Promise<void>;
  onAfterUpdatePropsEmit?: (component: MvcComponent, prevProps: any) => void | Promise<void>;
}

export function createComponentRenderConfig(): ComponentRenderConfig {
  return {
    renderComponent: ({ view: Renderer, controller }, props) => (
      <ControllerProvider value={controller}>{Renderer ? <Renderer {...props} /> : <>{props.children}</>}</ControllerProvider>
    ),
  };
}
