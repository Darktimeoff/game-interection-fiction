import { Log } from "@/generic/logging/log.decorator"
import { BusInterface } from "./bus.interface"

export class Bus<TKey extends object, D extends object> implements BusInterface<TKey, D> {
    protected mapped: Map<Function, D> = new Map()

    @Log(
        (key, handler) => `Register key: ${key?.constructor.name} with handler: ${handler?.constructor.name}`,
        (_, key, handler) => `Registered handler ${handler?.constructor.name} for key ${key?.constructor.name}`,
        (error, key, handler) => `Failed to register handler ${handler?.constructor.name} for key ${key?.constructor.name}: ${error}`
    )
    public register<T extends TKey>(key: { new (...args: any[]): T }, handler: D): void {
        if(!key || !handler) {
            throw new Error('Key or handler is not defined')
        }
        this.mapped.set(key, handler)
    }

    @Log(
        (key) => `Unregister key: ${key?.constructor?.name}`,
        (_, key) => `Unregistered handler ${key?.constructor?.name}`,
        (error, key) => `Failed to unregister handler ${key?.constructor?.name}: ${error}`
    )
    public unregister<T extends TKey>(key: { new (...args: any[]): T }): void {
        this.mapped.delete(key)
    }
}