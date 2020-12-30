import { LifecyclePluginProviderMethods } from '../lifecyclePlugin';

export function upgradeProviderRenderEmit(plugin: LifecyclePluginProviderMethods) {
  try {
    return plugin && plugin.upgradeRender && plugin.upgradeRender();
  } catch (err) {
    return void 0;
  }
}
