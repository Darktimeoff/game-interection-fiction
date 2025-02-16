import {readFile} from 'node:fs/promises';

export const loadJsonFile = async (filePath: string): Promise<any> => {
    const file = await readFile(filePath, 'utf8');
    return JSON.parse(file);    
}