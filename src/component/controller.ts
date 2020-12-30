import { PropsWithChildren } from 'react';

import { SYMBOL_ID, SYMBOL_MODEL, SYMBOL_PROPS, SYMBOL_VIEW } from '../const';
import { LifecycleComponent } from '../events';

import { Model, ModelClass } from './model';
import { View, ViewClass } from './view';

export type ControllerClassFabric<TProps = {}> = new () => Controller<TProps>;

export interface ControllerClass<TProps = {}> extends ControllerClassFabric<TProps> {
  [SYMBOL_MODEL]: ModelClass;
  [SYMBOL_VIEW]: ViewClass;
}

export interface Controller<TProps = {}, TModel extends Model<any> = Model<any>, TView extends View<any> = View<any>>
  extends LifecycleComponent<TProps> {
  [SYMBOL_ID]: string;
  [SYMBOL_MODEL]: TModel;
  [SYMBOL_VIEW]: TView;
  [SYMBOL_PROPS]: () => Readonly<PropsWithChildren<TProps>>;
}

export class Controller<TProps = {}, TModel extends Model<any> = Model<any>, TView extends View<any> = View<any>> {
  public get id() {
    return this[SYMBOL_ID];
  }

  public get model(): TModel {
    return this[SYMBOL_MODEL];
  }

  public get view(): TView {
    return this[SYMBOL_VIEW];
  }

  public get props(): Readonly<PropsWithChildren<TProps>> {
    return this[SYMBOL_PROPS] && this[SYMBOL_PROPS]();
  }
}
