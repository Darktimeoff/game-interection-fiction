import { QueryInterface } from "./query.interface";

export interface QueryHandlerInterface<T extends QueryInterface = any, TRes = T['__type']> {
    execute(query: T): Promise<TRes>;
}
