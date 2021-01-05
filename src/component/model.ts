import { StatefulObject } from '@berish/stateful';

import { LifecycleComponent } from '../events';
import { SYMBOL_CONTROLLER } from '../const';

import { Controller } from './controller';

export type ModelClassFabric<TController extends Controller<any> = Controller<any>> = new () => Model<TController>;

export interface ModelClass extends ModelClassFabric {}

export type ModelInstance<TModel extends Model> = StatefulObject<TModel>;

export interface Model<TController extends Controller<any> = Controller<any>>
  extends LifecycleComponent<TController['props']> {
  [SYMBOL_CONTROLLER]: TController;
}

export class Model<TController extends Controller<any> = Controller<any>> {
  public get controller(): TController {
    return this[SYMBOL_CONTROLLER];
  }

  public get props(): TController['props'] {
    return this.controller.props;
  }
}
