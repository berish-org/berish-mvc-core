import { SYMBOL_VIEW, SYMBOL_MODEL } from '../const';
import { ControllerClass } from './controller';
import { View } from './view';
import { ModelFabric } from './model';
import { Controller } from '.';

export function setView<TView extends View<any>>(view: TView) {
  return function <TController extends ControllerClass>(controller: TController) {
    controller[SYMBOL_VIEW] = view;
    return controller;
  };
}

export function getView(controller: ControllerClass): View {
  return controller && controller[SYMBOL_VIEW];
}

export function setModel<BaseController extends Controller>(modelClass: ModelFabric<BaseController>) {
  return function <TController extends ControllerClass<BaseController['props']>>(controller: TController) {
    // TODO
    controller[SYMBOL_MODEL] = modelClass as any;
    return controller;
  };
}

export function getModel(controller: ControllerClass): ModelFabric {
  return controller && controller[SYMBOL_MODEL];
}
