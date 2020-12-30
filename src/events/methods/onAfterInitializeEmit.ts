import { LifecycleInitializeSteps } from '../lifecycleComponent';
import { tryCatch } from '../../modules';

export function onAfterInitializeEmit(lifecycleComponent: LifecycleInitializeSteps) {
  tryCatch(
    () => lifecycleComponent && lifecycleComponent.onAfterInitialize && lifecycleComponent.onAfterInitialize(),
    (reason) => console.log(`Catch onAfterInitializeEmit`, reason),
  );
}
