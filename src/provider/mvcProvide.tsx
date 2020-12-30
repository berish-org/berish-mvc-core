import * as React from 'react';
import { MvcController } from './mvcController';
import { mvcControllerContext } from './mvcControllerContext';

export type PropsWithMvcProvider<Props = {}> = Props & { mvcController?: MvcController };

export function mvcProvide<TProps>(
  Component: React.ComponentClass<PropsWithMvcProvider<TProps>> | React.FunctionComponent<PropsWithMvcProvider<TProps>>,
) {
  const provideComponent: React.FunctionComponent<TProps> = function (props) {
    return (
      <mvcControllerContext.Consumer>
        {(mvcController) => <Component mvcController={mvcController} {...props} />}
      </mvcControllerContext.Consumer>
    );
  };
  provideComponent.displayName = `MVC(${Component.displayName || Component.name})`;
  return provideComponent;
}
