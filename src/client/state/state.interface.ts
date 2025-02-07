import { UserEntityInterface } from "@/user/entity/user-entity.interface";

export interface StateInterface {
    user: UserEntityInterface | null;
}