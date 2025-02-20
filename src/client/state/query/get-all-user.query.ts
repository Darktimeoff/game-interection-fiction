import { Query } from "@/generic/cqrs/query/query";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";

export class GetAllUserQuery extends Query<UserEntityInterface[]> {
    constructor() {
        super()
    }
}