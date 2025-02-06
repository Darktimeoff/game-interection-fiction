import { UserEntityInterface } from "@/user/entity/user-entity.interface";

export interface UserCreateDtoInterface extends Pick<UserEntityInterface, 'name'> {}