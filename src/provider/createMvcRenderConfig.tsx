import * as React from 'react';
import { MvcRenderProps } from './mvcRender';

export interface MvcRenderConfig {
  renderApp: (props: React.PropsWithChildren<MvcRenderProps>) => React.ReactNode;
  renderLoader: (props: React.PropsWithChildren<MvcRenderProps>) => React.ReactNode;
}

export function createMvcRenderConfig(): MvcRenderConfig {
  return {
    renderApp: (props: React.PropsWithChildren<{}>) => props.children,
    renderLoader: () => 'Loading',
  };
}
