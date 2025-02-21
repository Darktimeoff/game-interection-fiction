import { LoggerInterface } from "@/generic/logging/logger.service";  
import { DecoratedMethodResultType } from "@/generic/decorators/type/decorated-method-result.type";
import { MethodDecoratorType } from "@/generic/decorators/type/method-decorator.type";
import { serviceLocator } from "@/client/app/app.container";
import { ServiceEnum } from "../service-locator/service.enum";

export function LogClass()  {
    const logger = serviceLocator.get<LoggerInterface>(ServiceEnum.Logger)
    if (!logger) {
        throw new Error('Logger not found')
    }

    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        try {
            logger.setContext(`${constructor.name}::constructor `);

            return class extends constructor {
                constructor(...args: any[]) {
                    super(...args);
                    logger!.log(`initialized`);
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Failed to create class: ${error.message}`);
            }
    
            throw error;
        }
    }
}

export type ErrorLogFunction<TArgs extends unknown[]> = (
    error: unknown,
    arg1: TArgs[0],
    arg2: TArgs[1],
    arg3: TArgs[2],
    arg4: TArgs[3],
    arg5: TArgs[4]
) => string;

export type PostLogFunction<T, TArgs extends unknown[]> = (
    result: T,
    arg1: TArgs[0],
    arg2: TArgs[1],
    arg3: TArgs[2],
    arg4: TArgs[3],
    arg5: TArgs[4]
) => string;

export type PreDecoratorFunction<TArgs extends unknown[], TResult = string> = (
    arg1: TArgs[0],
    arg2: TArgs[1],
    arg3: TArgs[2],
    arg4: TArgs[3],
    arg5: TArgs[4]
) => TResult;

export const Log =
    <TResult, TArgs extends unknown[] = unknown[]>(
        preLog: PreDecoratorFunction<TArgs> | string,
        postLog?: PostLogFunction<DecoratedMethodResultType<TResult>, TArgs> | string,
        errorLog?: ErrorLogFunction<TArgs> | string
    ): MethodDecoratorType<TResult, TArgs> =>
    (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value!;

        descriptor.value = function (...args: TArgs): TResult {
            type R = DecoratedMethodResultType<TResult>;


            const logger = serviceLocator.get<LoggerInterface>(ServiceEnum.Logger)
            if (!logger) {
                throw new Error('Logger not found')
            }

            logger.setContext(`${target.constructor.name}::${String(propertyKey)} `);

            const runPreLog = (): void => {
                if (typeof preLog === 'string') {
                    logger.log(preLog);
                } else if (typeof preLog === 'function') {
                    logger.log(preLog(args[0], args[1], args[2], args[3], args[4]));
                }
            };

            const runPostLog = (res: R): R => {
                if (typeof postLog === 'string') {
                    logger.log(postLog);
                } else if (typeof postLog === 'function') {
                    logger.log(postLog(res, args[0], args[1], args[2], args[3], args[4]));
                }

                return res;
            };

            const runErrorLog = (error: unknown): void => {
                if (typeof errorLog === 'string') {
                    logger.error(errorLog);
                } else if (typeof errorLog === 'function') {
                    logger.error(errorLog(error, args[0], args[1], args[2], args[3], args[4]));
                }
            };

            try {
                runPreLog();

                const result = originalMethod.apply(this, args);

                if (postLog) {
                    if (result instanceof Promise) {
                        return result.then(runPostLog).catch((error: unknown) => {
                            runErrorLog(error);

                            throw error;
                        }) as unknown as TResult;
                    }

                    runPostLog(result as R);
                }

                return result;
            } catch (error) {
                runErrorLog(error);

                throw error;
            }
        };

        return descriptor;
    };