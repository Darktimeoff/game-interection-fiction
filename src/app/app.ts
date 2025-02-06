import { Log, LogClass } from "@/generic/logging/log.decorator";

@LogClass()
export class App {
    constructor() {}

    @Log('initialize', 'initialized', (error) => `Failed to initialize: ${error}`)  
    initialize() {}
}
