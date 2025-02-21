import { CacheInMemory } from "@/generic/cache/cache-inmemory";
import { LoggerConsole } from "@/generic/logging/logger.service";
import { ServiceLocator } from "@/generic/service-locator/service-locator.service";
import { ServiceEnum } from "@/generic/service-locator/service.enum";

const serviceLocator = new ServiceLocator()
serviceLocator.register(ServiceEnum.Cache, new CacheInMemory())
serviceLocator.register(ServiceEnum.Logger, new LoggerConsole())

export { serviceLocator }