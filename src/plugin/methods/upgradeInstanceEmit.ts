import { Controller, ControllerClass, View, ViewClass, ModelFabric } from '../../component';
import { LifecyclePluginComponentMethods } from '../lifecyclePlugin';

export function upgradeInstanceEmit(plugin: LifecyclePluginComponentMethods<ControllerClass, Controller>, instanceType: Controller): Controller;
export function upgradeInstanceEmit(plugin: LifecyclePluginComponentMethods<ModelFabric, object>, instanceType: object): object;
export function upgradeInstanceEmit(plugin: LifecyclePluginComponentMethods<ViewClass, View>, instanceType: View): View;
export function upgradeInstanceEmit<ClassType, InstanceType>(plugin: LifecyclePluginComponentMethods<ClassType, InstanceType>, instanceType: InstanceType) {
  try {
    return (plugin && plugin.upgradeInstance && plugin.upgradeInstance(instanceType)) || instanceType;
  } catch (err) {
    return instanceType;
  }
}
