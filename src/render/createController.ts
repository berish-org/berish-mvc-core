import guid from 'berish-guid';

import { ControllerClass } from '../component';
import { SYMBOL_ID } from '../const';
import { onConstructEmit } from '../events/methods';
import { upgradeInstanceEmit } from '../plugin/methods';
import { MvcController } from '../provider/mvcController';

export function createController(mvcController: MvcController, controllerClass: ControllerClass) {
  if (!controllerClass) return null;

  mvcController.registerController(controllerClass);

  let controller = mvcController.createControllerInstance(controllerClass);
  if (!controller) return null;

  controller[SYMBOL_ID] = guid.guid();

  onConstructEmit(controller);

  controller = mvcController.corePlugins
    .map((m) => m.controller)
    .reduce((controller, plugin) => upgradeInstanceEmit(plugin, controller), controller);

  return controller;
}
