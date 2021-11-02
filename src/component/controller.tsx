import React, { PropsWithChildren } from 'react';
import { SYMBOL_ID, SYMBOL_MODEL, SYMBOL_PROPS, SYMBOL_RENDER_CONFIG, SYMBOL_VIEW } from '../const';
import { LifecycleComponent } from '../events';
import { ComponentRenderConfig } from '../render/createComponentRenderConfig';

import { ModelFabric } from './model';
import { View } from './view';

export type ControllerClassFabric<TProps = {}> = new () => Controller<TProps>;

export interface ControllerClass<TProps = {}> extends ControllerClassFabric<TProps> {
  [SYMBOL_MODEL]?: ModelFabric;
  [SYMBOL_VIEW]?: View;
  id?: string;
  bro?(): this;
  Render?(props: TProps): React.ReactElement;
}

export type ControllerClassProps<TController extends ControllerClass> = InstanceType<TController>['props'];

export interface Controller<TProps = {}, TModel extends object = {}> extends LifecycleComponent<TProps> {
  [SYMBOL_ID]: string;
  [SYMBOL_MODEL]: TModel;
  [SYMBOL_PROPS]: () => Readonly<PropsWithChildren<TProps>>;
  [SYMBOL_RENDER_CONFIG]: ComponentRenderConfig;
  classId?: string;
}

// interface StaticThisFunction {
//   <T extends ControllerClass>(this: T): React.FunctionComponent<
//     InstanceType<T>
//   >;
// }

export const ControllerContext = React.createContext(null);

export class Controller<TProps = {}, TModel extends object = {}> {
  static create<T extends ControllerClass>(this: T): InstanceType<T> {
    return new this() as any;
  }

  static useController<T extends ControllerClass>(this: T): InstanceType<T> {
    return React.useContext<InstanceType<T>>(ControllerContext);
  }

  public get id(): Readonly<string> {
    return this[SYMBOL_ID];
  }

  public get model(): TModel {
    return this[SYMBOL_MODEL];
  }

  public get props(): Readonly<PropsWithChildren<TProps>> {
    return this[SYMBOL_PROPS] && this[SYMBOL_PROPS]();
  }

  public get renderConfig(): ComponentRenderConfig {
    return this[SYMBOL_RENDER_CONFIG];
  }
}

export class Test extends Controller<{ test: boolean }> {}

Test.useController().props;
