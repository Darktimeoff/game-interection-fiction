import { EnvService } from "../enviroment/enviroment-service";

export interface LoggerInterface {
    log(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    setContext(context: string): void;
}

export abstract class AbstractLoggerTemplate implements LoggerInterface {
    private context: string = '';

    constructor(context: string = '', private readonly envService: EnvService = new EnvService()) {
        this.setContext(context);
    }

    log(message: string) {
        if(!this.envService.get('LOGGING')) {
            return
        }

        this.handlerLog(this.formatMessage(message));
    };
    error(message: string) {
        if(!this.envService.get('LOGGING')) {
            return
        }

        this.handlerError(this.formatMessage(message));
    };
    warn(message: string) {
        if(!this.envService.get('LOGGING')) {
            return
        }

        this.handlerWarn(this.formatMessage(message));
    };

    setContext(context: string): void {
        this.context = context;
    }

    private formatMessage(message: string): string {
        return `\n${this.getDate()} ${this.context}${message}`;
    }

    private getDate(): string {
        return `[${new Date().toISOString()}]`;
    }

    protected abstract handlerLog(message: string): void;
    protected abstract handlerError(message: string): void;
    protected abstract handlerWarn(message: string): void;
}

export class LoggerConsole extends AbstractLoggerTemplate {
    handlerLog(message: string): void {
        console.log(message);
    }

    handlerError(message: string): void {
        console.error(message);
    }

    handlerWarn(message: string): void {
        console.warn(message);
    }
}