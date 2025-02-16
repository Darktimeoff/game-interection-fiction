import { MenuActionEnum } from "@/client/menu/enum/menu-action.enum";

export interface MenuItemInterface {
    id: number;
    title: string;
}

export interface MenuItemActionInterface extends MenuItemInterface {
    id: MenuActionEnum;
    action: () => Promise<void>;
}