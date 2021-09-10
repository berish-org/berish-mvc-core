import { Controller } from './controller';

// export type ModelClassFabric<TController extends Controller<any> = Controller<any>> = (
//   controller: TController,
// ) => object;

export type ModelFabric<TController extends Controller<any> = Controller<any>> = (controller: TController) => object;
