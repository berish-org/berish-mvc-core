import React from 'react';
import { observer } from 'mobx-react-lite';
import { MvcComponent } from './createComponent';

export interface ComponentRenderConfig {
  connectModel: (component: MvcComponent) => object[];

  connectRenderView: (
    component: MvcComponent,
    models: object[],
    RenderView: React.FunctionComponent<any>,
  ) => React.FunctionComponent<any>;

  renderComponent: (
    component: MvcComponent,
    connectedView: React.FunctionComponent<any>,
    props: { [key: string]: any },
  ) => JSX.Element;

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
    connectModel: ({ model }) => (model ? [model] : []),
    connectRenderView: (component, models, renderView) => observer(renderView),
    renderComponent: (component, ConnectedView, props) => <ConnectedView {...props} />,
  };
}
