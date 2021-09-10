import { MvcController } from '../provider/mvcController';
import { Controller, ModelFabric } from '../component';
import { upgradeInstanceEmit } from '../plugin/methods';
import { onConstructEmit } from '../events/methods';

export function createModelTarget(mvcController: MvcController, modelFabric: ModelFabric, controller: Controller) {
  if (!modelFabric) return null;

  mvcController.registerModel(modelFabric);

  let model = mvcController.createModelInstance(modelFabric, controller);
  if (!model) return null;

  onConstructEmit(model);

  model = mvcController.corePlugins
    .map((m) => m.model)
    .reduce((model, plugin) => upgradeInstanceEmit(plugin, model), model);

  return model;
}
