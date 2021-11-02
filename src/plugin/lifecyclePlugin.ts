import { Controller, ControllerClass, View } from '../component';
import { MvcRenderConfig, MvcController } from '../provider';
import { ComponentRenderConfig } from '../render/createComponentRenderConfig';

export interface LifecyclePluginComponentMethods<ClassType, InstanceType> {
  upgradeClass?(classType: ClassType): ClassType | void;
  upgradeInstance?(instanceType: InstanceType): InstanceType | void;
}

export type LifecyclePluginControllerMethods = LifecyclePluginComponentMethods<ControllerClass, Controller>;
export type LifecyclePluginViewMethods = LifecyclePluginComponentMethods<View, JSX.Element>;

export interface LifecyclePluginProviderMethods {
  onBeforeInitialize?(): void;
  onAfterInitialize?(): void;
  upgrade?(): void;
  upgradeRender?(): void;
}

export interface LifecyclePluginCore {
  controller?: LifecyclePluginControllerMethods;
  view?: LifecyclePluginViewMethods;
  provider?: LifecyclePluginProviderMethods;
  upgradeRenderConfig?(renderConfig: ComponentRenderConfig): ComponentRenderConfig | void;
}

export interface LifecyclePluginGlobal {
  mvcController: MvcController;
  mvcRenderConfig: MvcRenderConfig;
}

export type LifecyclePlugin = ((lifeCyclePluginGlobal: LifecyclePluginGlobal) => LifecyclePluginCore) | LifecyclePluginCore;
