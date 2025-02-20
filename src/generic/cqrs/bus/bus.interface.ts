export interface BusInterface<TKey extends object, D extends object> {
    register<T extends TKey>(command: { new (...args: any[]): T }, handler: D): void
    unregister<T extends TKey>(command: { new (...args: any[]): T }): void
}