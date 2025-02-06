import { Singleton } from "@/generic/decorators/singleton.decorator"
import { Log, LogClass } from "@/generic/logging/log.decorator"

interface ServiceLocatorInterface {
    register(id: object, value: object): void

    unregister(id: object): void

    has(id: object): boolean

    get<T>(id: object): T | null
}

@Singleton
@LogClass()
export class ServiceLocator implements ServiceLocatorInterface {
    private serviceMap: Map<object, object> = new Map()

    @Log(
        (id, value) => `Registering service ${id} with value ${value}`,
        (id, value) => `Service ${id} with value ${value} registered`,
        (err) => `Error registering service: ${err}`
    )
    register(id: object, value: object) {
        this.serviceMap.set(id, value)
    }

    @Log(
        (id) => `Unregistering service ${id}`,
        (id) => `Service ${id} unregistered`,
        (err) => `Error unregistering service: ${err}`
    )
    unregister(id: object) {
        this.serviceMap.delete(id)
    }

    @Log(
        (id) => `Checking if service ${id} is registered`,
        (result, id) => `Service ${id} is registered: ${result}`,
        (err, id) => `Error checking if service ${id} is registered: ${err}`
    )           
    has(id: object): boolean {
        return this.serviceMap.has(id)
    } 

    // @ts-ignore
    @Log(
        (id) => `Getting service ${id}`,
        (result, id) => `Service ${id} found: ${result}`,
        (err, id) => `Error getting service ${id}: ${err}`
    )
    get<T>(id: object): T | null {
        return this.serviceMap.get(id) as T ?? null
    }
}
