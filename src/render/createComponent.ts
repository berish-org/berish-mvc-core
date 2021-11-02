import { PropsWithChildren } from 'react';

import { SYMBOL_PROPS } from '../const';
import { Controller, ControllerClass, getView, View } from '../component';
import { MvcController } from '../provider/mvcController';

import { createController } from './createController';

export interface MvcComponent {
  controller: Controller;
  view: View;
}

export function createComponent(mvcController: MvcController, controllerClass: ControllerClass, getProps: () => PropsWithChildren<{}>): MvcComponent {
  const controller = createController(mvcController, controllerClass);

  const view = getView(controllerClass);

  if (controller) {
    controller[SYMBOL_PROPS] = getProps;
  }

  return { controller, view };
}
