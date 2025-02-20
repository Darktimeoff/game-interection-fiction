import { QueryInterface } from "./interface/query.interface";

export class Query<T> implements QueryInterface {
    __type!: T
}