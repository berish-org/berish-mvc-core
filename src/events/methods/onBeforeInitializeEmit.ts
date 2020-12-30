import { tryCatch } from '../../modules';
import { LifecycleInitializeSteps } from '../lifecycleComponent';

export function onBeforeInitializeEmit(lifecycleComponent: LifecycleInitializeSteps) {
  tryCatch(
    () => lifecycleComponent && lifecycleComponent.onBeforeInitialize && lifecycleComponent.onBeforeInitialize(),
    (reason) => console.log(`Catch onBeforeInitializeEmit`, reason),
  );
}
