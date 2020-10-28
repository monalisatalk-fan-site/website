export type ReactiveState<T> = {
  value: T;
  update: (value: T) => void;
};
