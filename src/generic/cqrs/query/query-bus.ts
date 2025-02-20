import { Bus } from "@/generic/cqrs/bus/bus";
import { LogClass } from "@/generic/logging/log.decorator";
import { Singleton } from "@/generic/decorators/singleton.decorator";
import { QueryInterface } from "./interface/query.interface";
import { QueryHandlerInterface } from "./interface/query-handler.interface";
import { QueryBusInterface } from "./interface/query-bus.interface";

@Singleton
@LogClass()
export class QueryBus extends Bus<QueryInterface, QueryHandlerInterface<QueryInterface>> implements QueryBusInterface {
    constructor() {
        super()
    }

    public async execute<T extends QueryInterface, TRes = T['__type']>(query: T): Promise<TRes> {
        const handler = this.mapped.get(query.constructor)

        if(!handler) {
            throw new Error(`Handler for query ${query.constructor.name} not found`)
        }

        return await handler.execute(query)
    }
}