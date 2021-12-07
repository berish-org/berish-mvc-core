import { tryCatch } from '../../modules';
import { LifecycleComponent } from '../lifecycleComponent';

export function onUpdatePropsEmit<TProps>(lifecycleComponent: LifecycleComponent<TProps>, prevProps: TProps) {
  return tryCatch(
    () => lifecycleComponent && lifecycleComponent.onUpdateProps && lifecycleComponent.onUpdateProps(prevProps),
    (reason) => console.log(`Catch onUpdatePropsEmit`, reason),
  );
}
