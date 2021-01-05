import { onConstructEmit } from '../events/methods';
import { upgradeInstanceEmit } from '../plugin/methods';
import { MvcController } from '../provider/mvcController';
import { View, ViewClass } from '../component';

export function createView(mvcController: MvcController, viewClass: ViewClass) {
  if (!viewClass) return null;

  mvcController.registerView(viewClass);

  let view = mvcController.createViewInstance(viewClass);
  if (!view) return null;

  onConstructEmit(view);

  view = mvcController.corePlugins
    .map((m) => m.view)
    .reduce((view, plugin) => upgradeInstanceEmit(plugin, view) as View, view);

  return view;
}
