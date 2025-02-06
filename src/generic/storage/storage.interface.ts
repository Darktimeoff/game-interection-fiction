
export interface StorageInterface<T> {
    findOne(query: Partial<T>): Promise<T | null>;
    findAll(query?: Partial<T>): Promise<T[]>;
    create(item: T): Promise<T>;
    update(query: Partial<T>, item: T): Promise<T | null>;
    delete(query: Partial<T>): Promise<boolean>;
}