import { createStateful } from '@berish/stateful';

import { Model } from '../component';

export function createModelStateful(modelTarget: Model) {
  if (!modelTarget) return null;

  const modelStore = createStateful(modelTarget);
  return modelStore;
}
