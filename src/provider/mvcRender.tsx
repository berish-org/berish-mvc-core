import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { mvcControllerContext } from './mvcControllerContext';
import { MvcController } from './mvcController';
import { upgradeProviderRenderEmit } from '../plugin/methods';

export interface MvcRenderProps {
  mvcController: MvcController;
  preload?: () => void | Promise<void>;
}

export function MvcRender(props: React.PropsWithChildren<MvcRenderProps>) {
  const { mvcController, preload } = props;

  const renderConfig = useMemo(() => {
    const renderConfig = mvcController.mvcConfigRender;

    mvcController.corePlugins.map((m) => m.provider).forEach((plugin) => upgradeProviderRenderEmit(plugin));

    return renderConfig;
  }, [mvcController.mvcConfigRender, mvcController.corePlugins]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncEffect = async () => {
      setIsLoading(true);
      await mvcController.init();
      if (preload) await preload();
      setIsLoading(false);
    };
    asyncEffect();
  }, [mvcController, preload]);

  const render = useCallback(() => {
    if (isLoading && renderConfig.renderLoader) return renderConfig.renderLoader(props);
    if (renderConfig.renderApp) return renderConfig.renderApp(props);
    return props.children;
  }, [isLoading, renderConfig, props]);

  return <mvcControllerContext.Provider value={mvcController}>{render()}</mvcControllerContext.Provider>;
}
