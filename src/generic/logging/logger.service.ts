import { EnvService } from "../enviroment/enviroment-service";

export interface LoggerInterface {
    log(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    setContext(context: string): void;
}

export abstract class AbstractLogger implements LoggerInterface {
    private context: string = '';

    abstract log(message: string): void;
    abstract error(message: string): void;
    abstract warn(message: string): void;

    setContext(context: string): void {
        this.context = context;
    }

    protected formatMessage(message: string): string {
        return `\n${this.getDate()} ${this.context}${message}`;
    }

    private getDate(): string {
        return `[${new Date().toISOString()}]`;
    }
}

export class LoggerConsole extends AbstractLogger {
    constructor(context: string = '', private readonly envService: EnvService = new EnvService()) {
        super();
        this.setContext(context);
    }

    log(message: string): void {
        if(!this.envService.get('LOGGING')) {
            return
        }

        console.log(this.formatMessage(message));
    }

    error(message: string): void {
        if(!this.envService.get('LOGGING')) {
            return
        }

        console.error(this.formatMessage(message));
    }

    warn(message: string): void {
        if(!this.envService.get('LOGGING')) {
            return
        }

        console.warn(this.formatMessage(message));
    }
}