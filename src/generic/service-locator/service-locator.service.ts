import { Singleton } from "@/generic/decorators/singleton.decorator"

interface ServiceLocatorInterface {
    register(id: object, value: object): void

    unregister(id: object): void

    has(id: object): boolean

    get<T>(id: object): T
}

@Singleton
export class ServiceLocator implements ServiceLocatorInterface {
    private serviceMap: Map<object, object> = new Map()

    register(id: object, value: object) {
        this.serviceMap.set(id, value)
    }

    unregister(id: object) {
        this.serviceMap.delete(id)
    }

    has(id: object): boolean {
        return this.serviceMap.has(id)
    } 

    get<T>(id: object): T {
        return this.serviceMap.get(id) as T
    }
}
