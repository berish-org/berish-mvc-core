import { PropsWithChildren } from 'react';

import { SYMBOL_CONTROLLER, SYMBOL_MODEL, SYMBOL_PROPS, SYMBOL_VIEW } from '../const';
import { ControllerClass, getModel, getView } from '../component';
import { onAfterInitializeEmit } from '../events/methods';
import { MvcController } from '../provider/mvcController';

import { createController } from './createController';
import { createModelTarget } from './createModelTarget';
import { createModelStateful } from './createModelStateful';
import { createView } from './createView';

export function createComponent(
  mvcController: MvcController,
  controllerClass: ControllerClass,
  getProps: () => PropsWithChildren<{}>,
  forceUpdate: () => void,
) {
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

  if (controller) onAfterInitializeEmit(controller);
  if (model) onAfterInitializeEmit(model);
  if (view) onAfterInitializeEmit(view);

  return { controller, model, view };
}
