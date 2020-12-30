export interface LifecycleInitializeSteps {
  onBeforeInitialize?(): void;
  onAfterInitialize?(): void;
}

export interface LifecycleExecutionStatusSteps {
  onStart?(): void | Promise<void>;
  onStop?(): void | Promise<void>;
}

export interface LifecycleComponent<TProps = {}> extends LifecycleInitializeSteps, LifecycleExecutionStatusSteps {
  onUpdateProps?(prevProps: TProps): void | Promise<void>;
}
