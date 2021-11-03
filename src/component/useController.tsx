import React, { PropsWithChildren, useContext } from 'react';

import { controllerContext } from './controllerContext';
import type { ControllerClass, Controller } from './controller';

export function useController<T extends ControllerClass>(): InstanceType<T> {
  return useContext(controllerContext) as InstanceType<T>;
}

export const ControllerProvider = controllerContext.Provider;

export function ControllerProviderHOC<T extends Controller>(controllerClass: T) {
  return ({ children }: PropsWithChildren<{}>) => <ControllerProvider value={controllerClass}>{children}</ControllerProvider>;
}
