import { ComponentRenderConfig } from '../../render/createComponentRenderConfig';
import { LifecyclePluginCore } from '../lifecyclePlugin';

export function upgradeRenderConfigEmit(plugin: LifecyclePluginCore, renderConfig: ComponentRenderConfig) {
  try {
    return (plugin && plugin.upgradeRenderConfig && plugin.upgradeRenderConfig(renderConfig)) || renderConfig;
  } catch (err) {
    return renderConfig;
  }
}
