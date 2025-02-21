import '@/client/app/app.container'
import gameContainer from '@/client/game/game.container'
import { CacheInterface } from '@/generic/cache/cache.interface'
import { LoggerInterface } from '@/generic/logging/logger.service'
import { serviceLocator } from './app.container'
import { ServiceEnum } from '@/generic/service-locator/service.enum'

export class AppFactory {
    static async create({
        logger,
        cache
    }: {
        logger?: LoggerInterface
        cache?: CacheInterface
    } = {}) {
        if (logger) {
            serviceLocator.register(ServiceEnum.Logger, logger)
        }
        if (cache) {
            serviceLocator.register(ServiceEnum.Cache, cache)
        }

        return await gameContainer.startGame()
    }
}