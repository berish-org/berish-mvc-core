import { LifecyclePluginProviderMethods } from '../lifecyclePlugin';

export function upgradeProviderEmit(plugin: LifecyclePluginProviderMethods) {
  try {
    return plugin && plugin.upgrade && plugin.upgrade();
  } catch (err) {
    return void 0;
  }
}
