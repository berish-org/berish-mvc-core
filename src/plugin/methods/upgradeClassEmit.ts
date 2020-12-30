import { Controller, ControllerClass, View, ViewClass, Model, ModelClass } from '../../component';
import { LifecyclePluginComponentMethods } from '../lifecyclePlugin';

export function upgradeClassEmit(
  plugin: LifecyclePluginComponentMethods<ControllerClass, Controller>,
  classType: ControllerClass,
): ControllerClass;
export function upgradeClassEmit(
  plugin: LifecyclePluginComponentMethods<ModelClass, Model>,
  classType: ModelClass,
): ModelClass;
export function upgradeClassEmit(
  plugin: LifecyclePluginComponentMethods<ViewClass, View>,
  classType: ViewClass,
): ViewClass;
export function upgradeClassEmit<ClassType, InstanceType>(
  plugin: LifecyclePluginComponentMethods<ClassType, InstanceType>,
  classType: ClassType,
) {
  try {
    return (plugin && plugin.upgradeClass && plugin.upgradeClass(classType)) || classType;
  } catch (err) {
    return classType;
  }
}
