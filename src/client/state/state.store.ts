import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import { StateInterface } from "./state.interface";

export class StateStore implements StateInterface {
    user: UserEntityInterface | null = null;

    setUser(user: UserEntityInterface) {
        this.user = user;
    }
}