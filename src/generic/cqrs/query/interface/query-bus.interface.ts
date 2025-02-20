import { BusInterface } from "@/generic/cqrs/bus/bus.interface";
import { QueryInterface } from "./query.interface";
import { QueryHandlerInterface } from "./query-handler.interface";

export interface QueryBusInterface<QueryBase extends QueryInterface = QueryInterface> extends BusInterface<QueryBase, QueryHandlerInterface<QueryBase>> {
    execute<T extends QueryBase, TRes = any>(query: T): Promise<TRes>;
}
