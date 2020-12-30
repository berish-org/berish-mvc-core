import { LifecyclePluginProviderMethods } from '../lifecyclePlugin';

export function onAfterProviderInitialize(plugin: LifecyclePluginProviderMethods) {
  try {
    return plugin && plugin.onAfterInitialize && plugin.onAfterInitialize();
  } catch (err) {
    return void 0;
  }
}
