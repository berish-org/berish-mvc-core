import { LifecycleExecutionStatusSteps } from '../lifecycleComponent';
import { tryCatch } from '../../modules';

export function onStopEmit(lifecycleComponent: LifecycleExecutionStatusSteps) {
  return tryCatch(
    () => lifecycleComponent && lifecycleComponent.onStop && lifecycleComponent.onStop(),
    (reason) => console.log(`Catch onStopEmit`, reason),
  );
}
