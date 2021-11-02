import { Controller, ControllerClass, View, ViewClass, ModelFabric } from '../../component';
import { LifecyclePluginComponentMethods } from '../lifecyclePlugin';

export function upgradeClassEmit(plugin: LifecyclePluginComponentMethods<ControllerClass, Controller>, classType: ControllerClass): ControllerClass;
export function upgradeClassEmit(plugin: LifecyclePluginComponentMethods<ModelFabric, object>, classType: ModelFabric): ModelFabric;
export function upgradeClassEmit(plugin: LifecyclePluginComponentMethods<ViewClass, View>, classType: ViewClass): ViewClass;
export function upgradeClassEmit<ClassType, InstanceType>(plugin: LifecyclePluginComponentMethods<ClassType, InstanceType>, classType: ClassType) {
  try {
    return (plugin && plugin.upgradeClass && plugin.upgradeClass(classType)) || classType;
  } catch (err) {
    return classType;
  }
}
