import { Singleton } from "@/generic/decorators/singleton.decorator";
import { CacheInterface } from "./cache.interface";

@Singleton
export class CacheInMemory implements CacheInterface {
    private cache: Map<string, any> = new Map()

  
    get<T>(key: string): Promise<T | null> {
        return Promise.resolve(this.cache.get(key) ?? null)
    }

  
    set<T>(key: string, value: T): Promise<void> {
        this.cache.set(key, value)
        return Promise.resolve()
    }

    delete(key: string): Promise<void> {
        this.cache.delete(key)
        return Promise.resolve()
    }
}