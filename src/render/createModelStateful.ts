import { makeAutoObservable, isObservable } from 'mobx';

import { Model } from '../component';

export function createModelStateful(modelTarget: Model) {
  if (!modelTarget) return null;

  return isObservable(modelTarget) ? modelTarget : makeAutoObservable(modelTarget);
}
