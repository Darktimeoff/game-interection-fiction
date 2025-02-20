import { BusInterface } from "@/generic/cqrs/bus/bus.interface";
import { QueryInterface } from "./query.interface";
import { QueryHandlerInterface } from "./query-handler.interface";

export interface QueryBusInterface extends BusInterface<QueryInterface, QueryHandlerInterface<QueryInterface>> {
    execute<T extends QueryInterface, TRes = T['__type']>(query: T): Promise<TRes>;
}
