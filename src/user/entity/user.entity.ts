import { UserEntityInterface } from "./user-entity.interface";

export class UserEntity implements UserEntityInterface {
    id!: number;
    name!: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(user: UserEntityInterface) {
        this.id = user.id;
        this.name = user.name;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}