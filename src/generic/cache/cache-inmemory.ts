import { Singleton } from "@/generic/decorators/singleton.decorator";
import { CacheInterface } from "./cache.interface";
import { Log } from "@/generic/logging/log.decorator";

@Singleton
export class CacheInMemory implements CacheInterface {
    private cache: Map<string, any> = new Map()

    // @ts-expect-error
    @Log(
        (key) => `Get cache value for key: ${key}`,
        (result) => `Cache value: ${result}`,
        (error, key) => `Error in get: ${error} key: ${key}`
    )
    get<T>(key: string): Promise<T | null> {
        return Promise.resolve(this.cache.get(key) ?? null)
    }

    @Log(
        (key, value) => `Set cache value for key: ${key} - ${value}`,
        (key, value) => `Cache value by key: ${key} - ${value}`,
        (error, key, value) => `Error in set: ${error} key: ${key} value: ${value}`
    )
    set<T>(key: string, value: T): Promise<void> {
        this.cache.set(key, value)
        return Promise.resolve()
    }

    @Log(
        (key) => `Delete cache value for key: ${key}`,
        (key) => `Cache value: ${key}`,
        (error, key) => `Error in delete: ${error} key: ${key}`
    )
    delete(key: string): Promise<void> {
        this.cache.delete(key)
        return Promise.resolve()
    }
}