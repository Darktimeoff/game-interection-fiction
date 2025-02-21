import { Singleton } from "@/generic/decorators/singleton.decorator";
import { ConfigInterface } from "./config.interface";

@Singleton
export class EnvService {
    private config: ConfigInterface

    constructor() {
        this.config = {
            LOGGING: process.env.LOGGING === '1'
        }
    }

    get<T extends keyof ConfigInterface>(key: T): ConfigInterface[T] {
        return this.config[key]
    }
}