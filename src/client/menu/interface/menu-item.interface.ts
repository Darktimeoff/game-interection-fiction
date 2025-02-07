
export interface MenuItemInterface {
    id: number;
    title: string;
    action?: () => Promise<void>;
}