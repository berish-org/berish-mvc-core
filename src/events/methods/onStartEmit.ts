import { LifecycleExecutionStatusSteps } from '../lifecycleComponent';
import { tryCatch } from '../../modules';

export function onStartEmit(lifecycleComponent: LifecycleExecutionStatusSteps) {
  return tryCatch(
    () => lifecycleComponent && lifecycleComponent.onStart && lifecycleComponent.onStart(),
    (reason) => console.log(`Catch onStartEmit`, reason),
  );
}
