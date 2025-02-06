import { StorageInterface } from "./storage.interface";
import fs from 'node:fs/promises';
import { Log, LogClass } from "@/generic/logging/log.decorator";

@LogClass()
export class StorageFileService<T extends object> implements StorageInterface<T> {
    constructor(
        private readonly filePath: string
    ) {}

    @Log(
        (query) => `Find one item ${JSON.stringify(query)}`,
        (res, query) => `Found one item ${JSON.stringify(query)}: ${JSON.stringify(res)}`,
        (err, query) => `Error finding one item ${JSON.stringify(query)}: ${err}`
    )
    async findOne(query: Partial<T>): Promise<T | null> {
        const file = await this.getData();
        return file.find((item: T) => Object.keys(query).every(key => item[key as keyof T] === query[key as keyof T])) ?? null;
    }

    @Log(
        (query) => `Find many items ${JSON.stringify(query)}`,
        (res, query) => `Found many items ${JSON.stringify(query)}: ${JSON.stringify(res)}`,
        (err, query) => `Error finding many items ${JSON.stringify(query)}: ${err}`
    )
    async findAll(query: Partial<T> = {}): Promise<T[]> {
        const file = await this.getData();
        return file.filter((item: T) => Object.keys(query).every(key => item[key as keyof T] === query[key as keyof T]));
    }

    @Log(
        (item) => `Create item ${JSON.stringify(item)}`,
        (res, item) => `Created item ${JSON.stringify(item)}: ${JSON.stringify(res)}`,
        (err, item) => `Error creating item ${JSON.stringify(item)}: ${err}`
    )
    async create(item: T): Promise<T> {
        const file = await this.getData();
        file.push(item);
        await fs.writeFile(this.filePath, JSON.stringify(file));
        return item;
    }

    @Log(
        (id) => `Update item ${id}`,
        (res, id) => `Updated item ${id}: ${JSON.stringify(res)}`,
        (err, id) => `Error updating item ${id}: ${err}`
    )
    async update(query: Partial<T>, item: T): Promise<T | null> {
        const file = await this.getData();
        const index = await this.findIndexByQuery(query, file);

        if (index === -1) {
            return null;
        }

        file[index] = item;
        await fs.writeFile(this.filePath, JSON.stringify(file));
        return item;
    }

    @Log(
        (id) => `Delete item ${id}`,
        (res, id) => `Deleted item ${id}: ${JSON.stringify(res)}`,
        (err, id) => `Error deleting item ${id}: ${err}`
    )
    async delete(query: Partial<T>): Promise<boolean> {
        const file = await this.getData();
        const index = await this.findIndexByQuery(query, file);

        if (index === -1) {
            return false;
        }

        file.splice(index, 1);
        await fs.writeFile(this.filePath, JSON.stringify(file));

        return true;
    }

    private async getData(): Promise<T[]> {
        const data = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(data) as T[];
    }

    private async findIndexByQuery(query: Partial<T>, file: T[]): Promise<number> {
        return file.findIndex((item: T) => Object.keys(query).every(key => item[key as keyof T] === query[key as keyof T]));
    }
}