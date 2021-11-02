import { SYMBOL_VIEW } from '../const';
import { ControllerClass } from './controller';
import { View } from './view';

export function setView<TView extends View<any>>(view: TView) {
  return function <TController extends ControllerClass>(controller: TController) {
    controller[SYMBOL_VIEW] = view;
    return controller;
  };
}

export function getView(controller: ControllerClass): View {
  return controller && controller[SYMBOL_VIEW];
}
