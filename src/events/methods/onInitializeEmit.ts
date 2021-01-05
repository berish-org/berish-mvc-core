import { LifecycleInitializeSteps } from '../lifecycleComponent';
import { tryCatch } from '../../modules';

export function onInitializeEmit(lifecycleComponent: LifecycleInitializeSteps) {
  tryCatch(
    () => lifecycleComponent && lifecycleComponent.onInitialize && lifecycleComponent.onInitialize(),
    (reason) => console.log(`Catch onInitializeEmit`, reason),
  );
}
