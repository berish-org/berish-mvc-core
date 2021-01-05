import { tryCatch } from '../../modules';
import { LifecycleInitializeSteps } from '../lifecycleComponent';

export function onConstructEmit(lifecycleComponent: LifecycleInitializeSteps) {
  tryCatch(
    () => lifecycleComponent && lifecycleComponent.onConstruct && lifecycleComponent.onConstruct(),
    (reason) => console.log(`Catch onConstructEmit`, reason),
  );
}
