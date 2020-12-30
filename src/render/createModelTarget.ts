import { MvcController } from '../provider/mvcController';
import { ModelClass } from '../component';
import { upgradeInstanceEmit } from '../plugin/methods';
import { onBeforeInitializeEmit } from '../events/methods';

export function createModelTarget(mvcController: MvcController, modelClass: ModelClass) {
  if (!modelClass) return null;

  mvcController.registerModel(modelClass);

  let model = mvcController.createModelInstance(modelClass);
  if (!model) return null;

  onBeforeInitializeEmit(model);

  model = mvcController.corePlugins
    .map((m) => m.model)
    .reduce((model, plugin) => upgradeInstanceEmit(plugin, model), model);

  return model;
}
