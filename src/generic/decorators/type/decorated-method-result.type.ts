export type DecoratedMethodResultType<T> = T extends Promise<infer U> ? U : T;
