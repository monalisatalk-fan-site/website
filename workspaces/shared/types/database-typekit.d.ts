import firebase from 'firebase';

/** 型安全な firebase.database.Reference を定義する */
export type DefineTypedReference<Structure extends unknown> = Omit<firebase.database.Reference, 'child' | 'key' | 'set' | 'update' | 'ref' | 'on' | 'once'> & Structure extends Record<string, unknown>
  ? {
    child<Path extends PickChildKeys<Structure>>(path: Path): DefineTypedReference<PickChunkFromPath<Structure, Path>>;
    key: string;
    // TODO: 親の定義が面倒なので未対応
    // parent(): void;
    set: DefineSetterMethod<Structure>;
    update: DefineSetterMethod<Partial<Structure>>;
    ref<Path extends DefineReferencePath<Structure>>(path: Path): DefineTypedReference<PickChunkFromPath<Structure, Path>>;
    on(
      eventType: firebase.database.EventType,
      callback: (snapshot: DefineTypedDataSnapshot<Structure>, b?: string | null) => any,
      cancelCallbackOrContext?: ((error: Error) => any) | Object | null,
      context?: Object | null,
    ): (snapshot: DefineTypedDataSnapshot<Structure>, b?: string | null) => any;
    once(
      eventType: firebase.database.EventType,
      successCallback?: (snapshot: DefineTypedDataSnapshot<Structure>, b?: string | null) => any,
      cancelCallbackOrContext?: ((error: Error) => any) | Object | null,
      context?: Object | null,
    ): Promise<DefineTypedDataSnapshot<Structure>>;
  }
  : {
    child(path: never): never;
    key: string;
    // TODO: 親の定義が面倒なので未対応
    // parent(): void;
    set: DefineSetterMethod<Structure>;
    update: DefineSetterMethod<never>;
    ref(path: never): never;
    on(
      eventType: firebase.database.EventType,
      callback: (snapshot: DefineTypedDataSnapshot<Structure>, b?: string | null) => any,
      cancelCallbackOrContext?: ((error: Error) => any) | Object | null,
      context?: Object | null,
    ): (snapshot: DefineTypedDataSnapshot<Structure>, b?: string | null) => any;
    once(
      eventType: firebase.database.EventType,
      successCallback?: (snapshot: DefineTypedDataSnapshot<Structure>, b?: string | null) => any,
      cancelCallbackOrContext?: ((error: Error) => any) | Object | null,
      context?: Object | null,
    ): Promise<DefineTypedDataSnapshot<Structure>>;
  };

/** 設定値を実際のデータ型に変換する */
export type ConvertTypeToActualData<Value extends unknown> = Value extends Record<string, unknown>
  ? {
    [K in keyof Value as K extends `$${string}` ? string : K]: ConvertTypeToActualData<Value[K]>;
  }
  : Value;

/** 型安全な set / update メソッドを定義する */
export type DefineSetterMethod<Value extends unknown> = {
  // FIXME: Promiseの返り値をランタイムでチェック
  (value: ConvertTypeToActualData<Value>, onComplete?: (error: Error | null) => any): Promise<any>;
};

/** 型安全な firebase.database.DataSnapshot 型を定義する */
export type DefineTypedDataSnapshot<Value extends unknown> = Omit<firebase.database.DataSnapshot, 'val'> & {
  val(): Value;
};

/** 型が完全に一致するか */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

/** 型安全なパスを定義する */
export type DefineReferencePath<Structure extends unknown> = {
  [K in keyof Structure]: K extends string
    ? K extends `$${string}`
      ? ''
      : `${K}`
    : never;
}[keyof Structure];

/** 直下のキーを取り出す */
export type PickChildKeys<Structure extends unknown> = Structure extends Record<string, unknown>
  ? {
    [K in keyof Structure]: K extends string
      ? K extends `$${string}`
        ? string
        : K
      : never;
  }[keyof Structure]
  : never;

/** パスから構造のチャンクを取り出す */
export type PickChunkFromPath<Structure extends unknown, Path extends unknown> =
  Path extends string
    ? Path extends `${infer T}/${infer K}`
      ? T extends keyof Structure
        ? PickChunkFromPath<Structure[T], K>
        : never
      : Path extends keyof Structure
        ? Structure[Path]
        : {
          [K in keyof Structure]: K extends `$${string}` ? Structure[K] : never
        }[keyof Structure]
    : never;

/** 型安全版な firebase.database.Database を定義する */
export type DefineTypedDatabase<Structure extends unknown> = Omit<firebase.database.Database, 'ref'> & {
  ref<Path extends
    | DefineReferencePath<Structure>
    | '.info/connected'
    | '.info/serverTimeOffset'
  >(path: Path): '.info/connected' extends Path
    ? 1
    : '.info/serverTimeOffset' extends Path
      ? 2
      : DefineTypedReference<PickChunkFromPath<Structure, Path>>;
};
