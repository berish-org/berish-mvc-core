import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createMvcRenderConfig } from './createMvcRenderConfig';
import { mvcControllerContext } from './mvcControllerContext';
import { MvcController } from './mvcController';

export interface MvcRenderProps {
  mvcController: MvcController;
  preload?: () => void | Promise<void>;
}

export function MvcRender(props: React.PropsWithChildren<MvcRenderProps>) {
  const { mvcController, preload } = props;

  const { current: renderConfig } = useRef(createMvcRenderConfig());
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
  }, []);

  return <mvcControllerContext.Provider value={mvcController}>{render()}</mvcControllerContext.Provider>;
}
