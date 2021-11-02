import { Controller, ControllerClass, View, ViewInstance } from '../../component';
import { LifecyclePluginComponentMethods } from '../lifecyclePlugin';

export function upgradeInstanceEmit(plugin: LifecyclePluginComponentMethods<ControllerClass, Controller>, instanceType: Controller): Controller;
export function upgradeInstanceEmit(plugin: LifecyclePluginComponentMethods<View, ViewInstance>, instanceType: ViewInstance): ViewInstance;
export function upgradeInstanceEmit<ClassType, InstanceType>(plugin: LifecyclePluginComponentMethods<ClassType, InstanceType>, instanceType: InstanceType) {
  try {
    return (plugin && plugin.upgradeInstance && plugin.upgradeInstance(instanceType)) || instanceType;
  } catch (err) {
    return instanceType;
  }
}
