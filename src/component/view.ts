import { LifecycleComponent } from '../events';
import { SYMBOL_CONTROLLER } from '../const';

import { Controller } from './controller';

export type ViewClassFabric<TController extends Controller<any> = Controller<any>> = new () => View<TController>;
export interface ViewClass<TController extends Controller<any> = Controller<any>>
  extends ViewClassFabric<TController> {}

export interface View<TController extends Controller<any> = Controller<any>>
  extends LifecycleComponent<TController['props']> {
  render(): React.ReactNode;
  forceUpdate(): void;
  [SYMBOL_CONTROLLER]: TController;
}

export class View<TController extends Controller<any> = Controller<any>> {
  public get controller(): TController {
    return this[SYMBOL_CONTROLLER];
  }

  public get model(): TController['model'] {
    return this.controller.model;
  }

  public get props(): TController['props'] {
    return this.controller.props;
  }
}
