import { Controller, ControllerClass, View, ViewInstance, ModelFabric } from '../../component';
import { LifecyclePluginComponentMethods } from '../lifecyclePlugin';

export function upgradeClassEmit(plugin: LifecyclePluginComponentMethods<ControllerClass, Controller>, classType: ControllerClass): ControllerClass;
export function upgradeClassEmit(plugin: LifecyclePluginComponentMethods<ModelFabric, object>, classType: ModelFabric): ModelFabric;
export function upgradeClassEmit(plugin: LifecyclePluginComponentMethods<View, ViewInstance>, classType: View): View;
export function upgradeClassEmit<ClassType, InstanceType>(plugin: LifecyclePluginComponentMethods<ClassType, InstanceType>, classType: ClassType) {
  try {
    return (plugin && plugin.upgradeClass && plugin.upgradeClass(classType)) || classType;
  } catch (err) {
    return classType;
  }
}
