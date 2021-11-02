import guid from 'berish-guid';

import { ControllerClass, View, Controller } from '../component';
import { SYMBOL_ID } from '../const';
import { LifecyclePlugin, LifecyclePluginCore } from '../plugin';
import { upgradeClassEmit, upgradeProviderEmit } from '../plugin/methods';
import { createMvcRenderConfig, MvcRenderConfig } from './createMvcRenderConfig';

export class MvcController {
  private _controllerToPluginControllerDict: [ControllerClass, ControllerClass][] = [];
  private _viewToPluginViewDict: [View, View][] = [];

  private _corePlugins: LifecyclePluginCore[] = [];
  private _mvcRenderConfig: MvcRenderConfig = null;
  private _id: string = null;

  private constructor() {}

  public get id() {
    return this._id;
  }

  public get mvcConfigRender() {
    return this._mvcRenderConfig;
  }

  public get corePlugins() {
    return this._corePlugins;
  }

  public get controllers() {
    return this._controllerToPluginControllerDict;
  }

  public get onlyOriginalControllers() {
    return this._controllerToPluginControllerDict.map((m) => m[0]);
  }

  public get onlyPluginControllers() {
    return this._controllerToPluginControllerDict.map((m) => m[0]);
  }

  public get views() {
    return this._viewToPluginViewDict;
  }

  public get onlyOriginalViews() {
    return this._viewToPluginViewDict.map((m) => m[0]);
  }

  public get onlyPluginViews() {
    return this._viewToPluginViewDict.map((m) => m[0]);
  }

  public init() {
    this.corePlugins.map((m) => m.provider).forEach((plugin) => upgradeProviderEmit(plugin));
  }

  public registerController(originalController: ControllerClass): void {
    if (this.isRegisteredController(originalController)) return void 0;

    const pluginController = this.corePlugins.map((m) => m.controller).reduce((controller, plugin) => upgradeClassEmit(plugin, controller), originalController);

    originalController.id = pluginController.id = guid.guid();
    this._controllerToPluginControllerDict.push([originalController, pluginController]);
  }

  public unregisterController(originalOrPluginController: ControllerClass): void {
    if (this.isRegisteredController(originalOrPluginController)) {
      const originalController = this.getOriginalController(originalOrPluginController);
      const pluginController = this.getPluginController(originalOrPluginController);
      if (originalController) originalController.id = undefined;
      if (pluginController) pluginController.id = undefined;

      this._controllerToPluginControllerDict = this._controllerToPluginControllerDict.filter(
        (m) => m[0] !== originalOrPluginController && m[1] !== originalOrPluginController,
      );
    }
  }

  public getPluginController(originalOrPluginController: ControllerClass) {
    if (this.isRegisteredPluginController(originalOrPluginController)) return originalOrPluginController;
    if (this.isRegisteredOriginalController(originalOrPluginController)) {
      const tuple = this.controllers.filter((m) => m[0] === originalOrPluginController)[0];
      return tuple && tuple[1];
    }
    return null;
  }

  public getOriginalController(originalOrPluginController: ControllerClass) {
    if (this.isRegisteredOriginalController(originalOrPluginController)) return originalOrPluginController;
    if (this.isRegisteredPluginController(originalOrPluginController)) {
      const tuple = this.controllers.filter((m) => m[1] === originalOrPluginController)[0];
      return tuple && tuple[0];
    }
    return null;
  }

  public isRegisteredOriginalController(originalController: ControllerClass) {
    return this.onlyOriginalControllers.indexOf(originalController) !== -1;
  }

  public isRegisteredPluginController(pluginController: ControllerClass) {
    return this.onlyPluginControllers.indexOf(pluginController) !== -1;
  }

  public isRegisteredController(originalOrPluginController: ControllerClass) {
    if (this.isRegisteredOriginalController(originalOrPluginController)) return true;
    if (this.isRegisteredPluginController(originalOrPluginController)) return true;
    return false;
  }

  public createControllerInstance<TControllerClass extends ControllerClass>(originalOrPluginController: TControllerClass): InstanceType<TControllerClass> {
    const pluginController = this.getPluginController(originalOrPluginController);
    if (!pluginController) return null;

    const instance = new pluginController() as InstanceType<TControllerClass>;
    instance[SYMBOL_ID] = guid.guid();
    instance.classId = pluginController.id;
    return instance;
  }

  public registerView(originalView: View): void {
    if (this.isRegisteredView(originalView)) return void 0;

    const pluginView = this.corePlugins.map((m) => m.view).reduce((view, plugin) => upgradeClassEmit(plugin, view) as View, originalView);

    this._viewToPluginViewDict.push([originalView, pluginView]);
  }

  public unregisterView(originalOrPluginView: View): void {
    if (this.isRegisteredView(originalOrPluginView))
      this._viewToPluginViewDict = this._viewToPluginViewDict.filter((m) => m[0] !== originalOrPluginView && m[1] !== originalOrPluginView);
  }

  public getPluginView(originalOrPluginView: View) {
    if (this.isRegisteredPluginView(originalOrPluginView)) return originalOrPluginView;
    if (this.isRegisteredOriginalView(originalOrPluginView)) {
      const tuple = this.views.filter((m) => m[0] === originalOrPluginView)[0];
      return tuple && tuple[1];
    }
    return null;
  }

  public getOriginalView(originalOrPluginView: View) {
    if (this.isRegisteredOriginalView(originalOrPluginView)) return originalOrPluginView;
    if (this.isRegisteredPluginView(originalOrPluginView)) {
      const tuple = this.views.filter((m) => m[1] === originalOrPluginView)[0];
      return tuple && tuple[0];
    }
    return null;
  }

  public isRegisteredOriginalView(originalController: View) {
    return this.onlyOriginalViews.indexOf(originalController) !== -1;
  }

  public isRegisteredPluginView(pluginController: View) {
    return this.onlyPluginViews.indexOf(pluginController) !== -1;
  }

  public isRegisteredView(originalOrPluginController: View) {
    if (this.isRegisteredOriginalView(originalOrPluginController)) return true;
    if (this.isRegisteredPluginView(originalOrPluginController)) return true;
    return false;
  }

  public static create(plugins: LifecyclePlugin[]) {
    const mvcRenderConfig = createMvcRenderConfig();
    const mvcController = new MvcController();

    mvcController._mvcRenderConfig = mvcRenderConfig;
    mvcController._id = guid.guid();

    const corePlugins = plugins.map((m) => (typeof m === 'function' ? m({ mvcController, mvcRenderConfig }) : m)).filter(Boolean);
    mvcController._corePlugins = corePlugins;

    return mvcController;
  }
}
