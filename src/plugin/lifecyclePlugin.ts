import { Controller, ControllerClass, View, ViewClass, Model, ModelClass } from '../component';

export interface LifecyclePluginComponentMethods<ClassType, InstanceType> {
  upgradeClass?(classType: ClassType): ClassType | void;
  upgradeInstance?(instanceType: InstanceType): InstanceType | void;
}

export type LifecyclePluginControllerMethods = LifecyclePluginComponentMethods<ControllerClass, Controller>;
export type LifecyclePluginModelMethods = LifecyclePluginComponentMethods<ModelClass, Model>;
export type LifecyclePluginViewMethods = LifecyclePluginComponentMethods<ViewClass, View>;

export interface LifecyclePluginProviderMethods {
  onBeforeInitialize?(): void;
  onAfterInitialize?(): void;
  upgrade?(): void;
  upgradeRender?(): void;
}

export interface LifecyclePluginCore {
  controller?: LifecyclePluginControllerMethods;
  model?: LifecyclePluginModelMethods;
  view?: LifecyclePluginViewMethods;
  provider?: LifecyclePluginProviderMethods;
}

export type LifecyclePlugin = ((systemController: any) => LifecyclePluginCore) | LifecyclePluginCore;
