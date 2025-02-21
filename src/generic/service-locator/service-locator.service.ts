import { Singleton } from "@/generic/decorators/singleton.decorator"

interface ServiceLocatorInterface<TKey extends string | object = string | object> {
    register(id: TKey, value: object): void

    unregister(id: TKey): void

    has(id: TKey): boolean

    get<T>(id: TKey): T | null
}

@Singleton
export class ServiceLocator<TKey extends string | object = string | object> implements ServiceLocatorInterface<TKey> {
    private serviceMap: Map<TKey, object> = new Map()


    register(id: TKey, value: object) {
        this.serviceMap.set(id, value)
    }

    unregister(id: TKey) {
        this.serviceMap.delete(id)
    }

        
    has(id: TKey): boolean {
        return this.serviceMap.has(id)
    } 

    get<T>(id: TKey): T | null {
        return this.serviceMap.get(id) as T ?? null
    }
}
