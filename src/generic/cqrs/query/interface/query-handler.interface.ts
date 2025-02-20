import { QueryInterface } from "./query.interface";

export interface QueryHandlerInterface<T extends QueryInterface = any, TRes = any> {
    execute(query: T): Promise<TRes>;
}
