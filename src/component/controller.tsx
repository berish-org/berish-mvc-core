import React, { PropsWithChildren } from 'react';
import { SYMBOL_ID, SYMBOL_PROPS, SYMBOL_RENDER_CONFIG, SYMBOL_VIEW } from '../const';
import { LifecycleComponent } from '../events';
import { ComponentRenderConfig } from '../render/createComponentRenderConfig';
import { RenderComponent } from '../render/renderComponent';
import { useController } from './useController';

import { View } from './view';

export interface ControllerClass<TProps = {}> {
  new (): Controller<TProps>;
  [SYMBOL_VIEW]?: View;
  id?: string;
  RenderComponent?<T extends Controller<{}>>(this: new () => T, props: PropsFromController<T>): React.ReactNode;
  Render?: <T extends Controller<{}>>(this: new () => T, props: PropsFromController<T>) => React.ReactNode;
  // Render?(props: TProps): React.ReactElement;
}

export type PropsFromController<TController> = TController extends Controller<infer Props> ? Props : TController;
export type PropsFromControllerClass<TController extends ControllerClass> = PropsFromController<InstanceType<TController>>;

export interface Controller<TProps = {}> extends LifecycleComponent<TProps> {
  [SYMBOL_ID]: string;
  [SYMBOL_PROPS]: () => Readonly<PropsWithChildren<TProps>>;
  [SYMBOL_RENDER_CONFIG]: ComponentRenderConfig;
  classId?: string;
}

export class Controller<TProps = {}> {
  static useController<T extends ControllerClass>(this: T) {
    return useController<T>();
  }

  static RenderComponent<T extends Controller>(this: new () => T, props: PropsFromController<T>): React.ReactNode {
    return React.createElement(RenderComponent, { controllerClass: this, ...props });
  }

  static get Render() {
    return this.RenderComponent;
  }

  public get id(): Readonly<string> {
    return this[SYMBOL_ID];
  }

  public get props(): Readonly<PropsWithChildren<TProps>> {
    return this[SYMBOL_PROPS] && this[SYMBOL_PROPS]();
  }

  public get renderConfig(): ComponentRenderConfig {
    return this[SYMBOL_RENDER_CONFIG];
  }
}
