import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import { StateInterface } from "./state.interface";
import { Log, LogClass } from "@/generic/logging/log.decorator";

@LogClass()
export class StateStore implements StateInterface {
    private _user: UserEntityInterface | null = null;

    get user(): UserEntityInterface | null {
        return this._user;
    }

    @Log(
        (user) => `Setting user: ${JSON.stringify(user)}`,
        (_, user) => `User setted ${JSON.stringify(user)}`,
        (error, user) => `Error setting user ${JSON.stringify(user)}: ${error}`,
    )   
    setUser(user: UserEntityInterface | null) {
        this._user = user;
    }
}