import { SYMBOL_VIEW, SYMBOL_MODEL } from '../const';
import { ControllerClass } from './controller';
import { ViewClass } from './view';
import { ModelFabric } from './model';
import { Controller } from '.';

export function setView<TView extends ViewClass>(viewClass: TView) {
  return function <TController extends ControllerClass>(controller: TController) {
    controller[SYMBOL_VIEW] = viewClass;
    return controller;
  };
}

export function getView(controller: ControllerClass): ViewClass {
  return controller && controller[SYMBOL_VIEW];
}

export function setModel<BaseController extends Controller>(modelClass: ModelFabric<BaseController>) {
  return function <TController extends BaseController>(controller: TController) {
    controller[SYMBOL_MODEL] = modelClass;
    return controller;
  };
}

export function getModel(controller: ControllerClass): ModelFabric {
  return controller && controller[SYMBOL_MODEL];
}
