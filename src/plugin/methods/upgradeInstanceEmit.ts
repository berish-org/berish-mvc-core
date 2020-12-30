import { Controller, ControllerClass, View, ViewClass, Model, ModelClass } from '../../component';
import { LifecyclePluginComponentMethods } from '../lifecyclePlugin';

export function upgradeInstanceEmit(
  plugin: LifecyclePluginComponentMethods<ControllerClass, Controller>,
  instanceType: Controller,
): Controller;
export function upgradeInstanceEmit(
  plugin: LifecyclePluginComponentMethods<ModelClass, Model>,
  instanceType: Model,
): Model;
export function upgradeInstanceEmit(plugin: LifecyclePluginComponentMethods<ViewClass, View>, instanceType: View): View;
export function upgradeInstanceEmit<ClassType, InstanceType>(
  plugin: LifecyclePluginComponentMethods<ClassType, InstanceType>,
  instanceType: InstanceType,
) {
  try {
    return (plugin && plugin.upgradeInstance && plugin.upgradeInstance(instanceType)) || instanceType;
  } catch (err) {
    return instanceType;
  }
}
