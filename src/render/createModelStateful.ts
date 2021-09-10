import { makeAutoObservable } from 'mobx';

import { Model } from '../component';

export function createModelStateful(modelTarget: Model) {
  if (!modelTarget) return null;

  return makeAutoObservable(modelTarget);
}
