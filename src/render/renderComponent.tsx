import { PropsWithChildren, useContext, useMemo } from 'react';

import { ControllerClass, ControllerClassProps } from '../component';
import { onInitializeEmit, onStartEmit, onStopEmit, onUpdatePropsEmit } from '../events/methods';
import { useComponentLifecycle, useForceUpdate } from '../hooks';
import { mvcControllerContext } from '../provider/mvcControllerContext';

import { getRenderView } from './renderView';
import { createComponent } from './createComponent';
import { SYMBOL_PROPS, SYMBOL_RENDER_CONFIG } from '../const';
import { createComponentRenderConfig } from './createComponentRenderConfig';
import { upgradeRenderConfigEmit } from '../plugin/methods';

export interface RenderComponentProps<TController extends ControllerClass> {
  controllerClass: TController;
}

export function RenderComponent<TController extends ControllerClass>(
  propsInternal: PropsWithChildren<RenderComponentProps<TController> & ControllerClassProps<TController>>,
) {
  const { controllerClass, ...props } = propsInternal;
  const mvcController = useContext(mvcControllerContext);

  const forceUpdate = useForceUpdate();

  const { component, renderConfig, ConnectedView } = useMemo(() => {
    const component = createComponent(mvcController, controllerClass, () => props, forceUpdate);

    const renderConfig = (component.controller[SYMBOL_RENDER_CONFIG] = mvcController.corePlugins.reduce(
      (renderConfig, plugin) => upgradeRenderConfigEmit(plugin, renderConfig),
      createComponentRenderConfig(),
    ));

    if (renderConfig.onBeforeInitialize) renderConfig.onBeforeInitialize(component);

    const models = renderConfig.connectModel(component);

    const ConnectedView = renderConfig.connectRenderView(component, models, getRenderView(component.view));

    if (component.controller) onInitializeEmit(component.controller);
    if (component.model) onInitializeEmit(component.model);
    if (component.view) onInitializeEmit(component.view);

    if (renderConfig.onAfterInitialize) renderConfig.onAfterInitialize(component);

    return { component, renderConfig, ConnectedView };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllerClass, mvcController, forceUpdate]);

  useComponentLifecycle(propsInternal, {
    componentDidMount: async () => {
      if (renderConfig.onBeforeStartEmit) await renderConfig.onBeforeStartEmit(component);

      await Promise.all([onStartEmit(component.controller), onStartEmit(component.model), onStartEmit(component.view)]);

      if (renderConfig.onAfterStartEmit) await renderConfig.onAfterStartEmit(component);
    },

    componentWillUnmount: async () => {
      if (renderConfig.onBeforeStopEmit) await renderConfig.onBeforeStopEmit(component);

      await Promise.all([onStopEmit(component.controller), onStopEmit(component.model), onStopEmit(component.view)]);

      if (renderConfig.onAfterStopEmit) await renderConfig.onAfterStopEmit(component);
    },

    componentDidUpdate: async (prevPropsInternal) => {
      const { controllerClass, ...prevProps } = prevPropsInternal;

      if (renderConfig.onBeforeUpdatePropsEmit) await renderConfig.onBeforeUpdatePropsEmit(component, prevProps);

      await Promise.all([
        onUpdatePropsEmit(component.controller, prevProps),
        onUpdatePropsEmit(component.model, prevProps),
        onUpdatePropsEmit(component.view, prevProps),
      ]);

      if (renderConfig.onAfterUpdatePropsEmit) await renderConfig.onAfterUpdatePropsEmit(component, prevProps);
    },
  });

  if (component.controller) {
    component.controller[SYMBOL_PROPS] = () => props;
  }

  return renderConfig.renderComponent(component, ConnectedView, props);
}
