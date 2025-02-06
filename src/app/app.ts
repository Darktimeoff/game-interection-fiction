import { Log, LogClass } from "@/generic/decorators/log";

@LogClass()
export class App {
    constructor() {}

    @Log('initialize', 'initialized', (error) => `Failed to initialize: ${error}`)  
    initialize() {}
}
