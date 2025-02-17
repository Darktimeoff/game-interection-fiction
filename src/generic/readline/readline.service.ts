import { createInterface, Interface } from "node:readline/promises";
import { Singleton } from "@/generic/decorators/singleton.decorator";

@Singleton
export class ReadlineService {
    private rl: Interface

    constructor() {
        this.rl = createInterface({
            input: process.stdin,
            output: process.stdout
        })

        process.on('SIGINT', () => this.cleanup())
        process.on('SIGTERM', () => this.cleanup())
        process.on('exit', () => this.cleanup())
    }

    private cleanup(): void {
        this.rl.close()
        process.exit(0)
    }

    question(query: string): Promise<string> {
        return this.rl.question(query)
    }

    pause(): void {
        this.rl.pause()
    }

    resume(): void {
        this.rl.resume()
    }
}