import { LifecyclePluginProviderMethods } from '../lifecyclePlugin';

export function onBeforeProviderInitialize(plugin: LifecyclePluginProviderMethods) {
  try {
    return plugin && plugin.onBeforeInitialize && plugin.onBeforeInitialize();
  } catch (err) {
    return void 0;
  }
}
