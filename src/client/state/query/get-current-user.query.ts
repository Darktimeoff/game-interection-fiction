import { Query } from "@/generic/cqrs/query/query";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";

export class GetCurrentUserQuery extends Query<UserEntityInterface | null> {
}