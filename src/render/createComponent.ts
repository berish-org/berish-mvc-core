import { PropsWithChildren } from 'react';

import { SYMBOL_CONTROLLER, SYMBOL_MODEL, SYMBOL_PROPS } from '../const';
import { Controller, ControllerClass, getModel, getView, View } from '../component';
import { MvcController } from '../provider/mvcController';

import { createController } from './createController';
import { createModelTarget } from './createModelTarget';
export interface MvcComponent {
  controller: Controller;
  model: object;
  view: View;
}

export function createComponent(mvcController: MvcController, controllerClass: ControllerClass, getProps: () => PropsWithChildren<{}>): MvcComponent {
  const controller = createController(mvcController, controllerClass);

  const modelClass = getModel(controllerClass);
  const model = createModelTarget(mvcController, modelClass, controller);

  const view = getView(controllerClass);

  if (controller) {
    controller[SYMBOL_PROPS] = getProps;

    if (model) {
      controller[SYMBOL_MODEL] = model;
      model[SYMBOL_CONTROLLER] = controller;
    }
  }

  return { controller, model, view };
}
