
export function Singleton<T extends { new (...args: any[]): any }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            if (!constructor.prototype._instance) {
                super(...args);
                constructor.prototype._instance = this;
            }
            return constructor.prototype._instance;
        }
    };
}
