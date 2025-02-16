import userContainer from "@/user/user.container";
import { StateUserService } from "./state-user.service";
import { StateStore } from "./state.store";

const stateStore = new StateStore()
const stateUserService = new StateUserService(stateStore, userContainer.userService);

export default stateUserService