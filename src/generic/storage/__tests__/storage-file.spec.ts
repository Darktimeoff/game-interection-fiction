import { StorageFileService } from "@/generic/storage/storage-file.service";
import fs from 'node:fs/promises';
interface ItemInterface {
    id: string;
    name: string;
}

describe('StorageFileService', () => {
    let storage: StorageFileService<ItemInterface>

    beforeEach(async () => {
        await fs.writeFile('test.json', JSON.stringify([]));
        storage = new StorageFileService<ItemInterface>('test.json');
    })

    afterEach(async () => {
        await fs.unlink('test.json');
    })

    it('should find one item', async () => {
        const item = await storage.findOne({ id: '1' });
        expect(item).toBeNull();
    })

    it('should find many items', async () => {
        const items = await storage.findMany({ id: '1' });
        expect(items).toEqual([]);
    })


    it('should create an item', async () => {
        const item = await storage.create({ id: '1', name: 'test' });
        expect(item).toEqual({ id: '1', name: 'test' });
    })

    it('should not update an item', async () => {
        const item = await storage.update({ id: '1' }, { id: '1', name: 'test 2' });
        expect(item).toBeNull();
    })

    it('should update an item', async () => {
        const item = await storage.create({ id: '1', name: 'test' });
        const item2 = await storage.update({ id: item.id }, { ...item, name: 'test 2' });
        expect(item2).toEqual({ id: item.id, name: 'test 2' });
    })

    it('should not delete an item', async () => {
        const deleted = await storage.delete({ id: '1' });
        expect(deleted).toBeFalsy();
    })

    it('should delete an item', async () => {
        const item = await storage.create({ id: '1', name: 'test' });
        const deleted = await storage.delete({ id: item.id });
        expect(deleted).toBeTruthy();
    })
})