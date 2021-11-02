import { Controller, ControllerClass, View, ModelFabric } from '../component';
import { MvcRenderConfig, MvcController } from '../provider';
import { ComponentRenderConfig } from '../render/createComponentRenderConfig';

export interface LifecyclePluginComponentMethods<ClassType, InstanceType> {
  upgradeClass?(classType: ClassType): ClassType | void;
  upgradeInstance?(instanceType: InstanceType): InstanceType | void;
}

export type LifecyclePluginControllerMethods = LifecyclePluginComponentMethods<ControllerClass, Controller>;
export type LifecyclePluginModelMethods = LifecyclePluginComponentMethods<ModelFabric, object>;
export type LifecyclePluginViewMethods = LifecyclePluginComponentMethods<View, JSX.Element>;

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
  upgradeRenderConfig?(renderConfig: ComponentRenderConfig): ComponentRenderConfig | void;
}

export interface LifecyclePluginGlobal {
  mvcController: MvcController;
  mvcRenderConfig: MvcRenderConfig;
}

export type LifecyclePlugin = ((lifeCyclePluginGlobal: LifecyclePluginGlobal) => LifecyclePluginCore) | LifecyclePluginCore;
