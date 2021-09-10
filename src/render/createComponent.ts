import { PropsWithChildren } from 'react';

import { SYMBOL_CONTROLLER, SYMBOL_MODEL, SYMBOL_PROPS, SYMBOL_VIEW } from '../const';
import { Controller, ControllerClass, getModel, getView, Model, View } from '../component';
import { MvcController } from '../provider/mvcController';

import { createController } from './createController';
import { createModelTarget } from './createModelTarget';
import { createModelStateful } from './createModelStateful';
import { createView } from './createView';
export interface MvcComponent {
  controller: Controller;
  model: Model;
  view: View;
}

export function createComponent(
  mvcController: MvcController,
  controllerClass: ControllerClass,
  getProps: () => PropsWithChildren<{}>,
  forceUpdate: () => void,
): MvcComponent {
  const controller = createController(mvcController, controllerClass);

  const modelClass = getModel(controllerClass);
  const modelTarget = createModelTarget(mvcController, modelClass);
  const model = createModelStateful(modelTarget);

  const viewClass = getView(controllerClass);
  const view = createView(mvcController, viewClass);

  if (controller) {
    controller[SYMBOL_PROPS] = getProps;

    if (model) {
      controller[SYMBOL_MODEL] = model;
      model[SYMBOL_CONTROLLER] = controller;
    }

    if (view) {
      controller[SYMBOL_VIEW] = view;
      view[SYMBOL_CONTROLLER] = controller;
      view.forceUpdate = forceUpdate;
    }
  }

  return { controller, model, view };
}
