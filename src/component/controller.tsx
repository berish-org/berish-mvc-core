import React, { PropsWithChildren } from 'react';
import { SYMBOL_ID, SYMBOL_MODEL, SYMBOL_PROPS, SYMBOL_RENDER_CONFIG, SYMBOL_VIEW } from '../const';
import { LifecycleComponent } from '../events';
import { ComponentRenderConfig } from '../render/createComponentRenderConfig';

import { Model, ModelClass, ModelInstance } from './model';
import { View, ViewClass } from './view';

export type ControllerClassFabric<TProps = {}> = new () => Controller<TProps>;

export interface ControllerClass<TProps = {}> extends ControllerClassFabric<TProps> {
  [SYMBOL_MODEL]?: ModelClass;
  [SYMBOL_VIEW]?: ViewClass;
  id?: string;
  Render?(props: TProps): React.ReactElement;
}

export type ControllerClassProps<TController extends ControllerClass> = InstanceType<TController>['props'];

export interface Controller<TProps = {}, TModel extends Model<any> = Model<any>, TView extends View<any> = View<any>>
  extends LifecycleComponent<TProps> {
  [SYMBOL_ID]: string;
  [SYMBOL_MODEL]: ModelInstance<TModel>;
  [SYMBOL_VIEW]: TView;
  [SYMBOL_PROPS]: () => Readonly<PropsWithChildren<TProps>>;
  [SYMBOL_RENDER_CONFIG]: ComponentRenderConfig;
  classId?: string;
}

// interface StaticThisFunction {
//   <T extends ControllerClass>(this: T): React.FunctionComponent<
//     InstanceType<T>
//   >;
// }

export class Controller<TProps = {}, TModel extends Model<any> = Model<any>, TView extends View<any> = View<any>> {
  // static bro<T extends new () => Controller>(this: T): InstanceType<T> {
  //   return new this() as InstanceType<T>;
  // }

  public get id(): Readonly<string> {
    return this[SYMBOL_ID];
  }

  public get model(): ModelInstance<TModel> {
    return this[SYMBOL_MODEL];
  }

  public get view(): TView {
    return this[SYMBOL_VIEW];
  }

  public get props(): Readonly<PropsWithChildren<TProps>> {
    return this[SYMBOL_PROPS] && this[SYMBOL_PROPS]();
  }

  public get renderConfig(): ComponentRenderConfig {
    return this[SYMBOL_RENDER_CONFIG];
  }
}
