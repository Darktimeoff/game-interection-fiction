import { ServiceEnum } from "@/generic/service-locator/service.enum";
import { CacheInterface } from "./cache.interface";
import { serviceLocator } from "@/client/app/app.container";
import { CacheInMemory } from "./cache-inmemory";

export function Cache(
    keyFactory: string | ((...args: any[]) => string)
) {
    return function (
        _: any,
        __: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const cacheService = serviceLocator?.get<CacheInterface>(ServiceEnum.Cache) ?? new CacheInMemory()

        descriptor.value = async function (...args: any[]) {
            const cacheKey = typeof keyFactory === 'string' 
                ? keyFactory 
                : keyFactory(...args);

            const cached = await cacheService.get(cacheKey);
            if (cached !== null) {
                return cached;
            }

            const result = await originalMethod.apply(this, args);
            await cacheService.set(cacheKey, result);

            return result;
        };

        return descriptor;
    };
}