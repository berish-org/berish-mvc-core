import { PropsWithChildren, useContext, useEffect, useMemo, useRef } from 'react';

import { ControllerClass, ControllerClassProps } from '../component';
import { onInitializeEmit, onStartEmit, onStopEmit, onUpdatePropsEmit } from '../events/methods';
import { mvcControllerContext } from '../provider/mvcControllerContext';
import { SYMBOL_PROPS, SYMBOL_RENDER_CONFIG } from '../const';
import { upgradeInstanceEmit, upgradeRenderConfigEmit } from '../plugin/methods';

import { createComponent } from './createComponent';
import { createComponentRenderConfig } from './createComponentRenderConfig';

export interface RenderComponentProps<TController extends ControllerClass> {
  controllerClass: TController;
}

export function RenderComponent<TController extends ControllerClass>(
  propsInternal: PropsWithChildren<RenderComponentProps<TController> & ControllerClassProps<TController>>,
) {
  const { controllerClass, ...props } = propsInternal;
  const mvcController = useContext(mvcControllerContext);

  const hasMounted = useRef(false);

  const { component, renderConfig } = useMemo(() => {
    const component = createComponent(mvcController, controllerClass, () => props);

    const renderConfig = (component.controller[SYMBOL_RENDER_CONFIG] = mvcController.corePlugins.reduce(
      (renderConfig, plugin) => upgradeRenderConfigEmit(plugin, renderConfig),
      createComponentRenderConfig(),
    ));

    if (renderConfig.onBeforeInitialize) renderConfig.onBeforeInitialize(component);

    if (component.controller) onInitializeEmit(component.controller);
    if (component.model) onInitializeEmit(component.model);

    if (renderConfig.onAfterInitialize) renderConfig.onAfterInitialize(component);

    return { component, renderConfig };
  }, [controllerClass, mvcController]);

  useEffect(() => {
    const onMount = async () => {
      if (renderConfig.onBeforeStartEmit) await renderConfig.onBeforeStartEmit(component);
      await Promise.all([onStartEmit(component.controller), onStartEmit(component.model)]);
      if (renderConfig.onAfterStartEmit) await renderConfig.onAfterStartEmit(component);
    };

    onMount().finally(() => (hasMounted.current = true));

    return () => {
      const unMount = async () => {
        if (renderConfig.onBeforeStopEmit) await renderConfig.onBeforeStopEmit(component);
        await Promise.all([onStopEmit(component.controller), onStopEmit(component.model)]);
        if (renderConfig.onAfterStopEmit) await renderConfig.onAfterStopEmit(component);
      };

      unMount();
    };
  }, [component, renderConfig]);

  useEffect(() => {
    const onUpdate = async () => {
      if (renderConfig.onBeforeUpdatePropsEmit) await renderConfig.onBeforeUpdatePropsEmit(component, props);

      await Promise.all([onUpdatePropsEmit(component.controller, props), onUpdatePropsEmit(component.model, props)]);

      if (renderConfig.onAfterUpdatePropsEmit) await renderConfig.onAfterUpdatePropsEmit(component, props);
    };

    onUpdate();
  }, [component, renderConfig, props]);

  if (component.controller) {
    component.controller[SYMBOL_PROPS] = () => props;
  }

  const renderedContent = renderConfig.renderComponent(component, props);
  const upgradedContent = mvcController.corePlugins.map((m) => m.view).reduce((view, plugin) => upgradeInstanceEmit(plugin, view), renderedContent);

  return upgradedContent;
}
