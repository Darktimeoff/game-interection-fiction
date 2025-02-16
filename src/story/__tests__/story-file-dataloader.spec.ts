import { StoryFileDataloader } from "@/story/story-file.dataloader";
import { StoryFileAccess } from "../story-file.access";
import { join } from "node:path";
import { StoryEnum } from "../enum/story.enum";

const path = join(__dirname, '..', '..', 'data', 'stories');

describe('StoryFileDataloader', () => {
    it('should load a story', async () => {
        const storyFileDataloader = new StoryFileDataloader();
        const story = await storyFileDataloader.load();
        expect(story.id).toBeTruthy()
        expect(story).toBeTruthy()
        expect(storyFileDataloader.path).toEqual(path);
    });

    it('should throw an error if episode id is not found', async () => {
        const storyFileAccess = new StoryFileAccess(new StoryFileDataloader());
        // @ts-ignore
        await expect(storyFileAccess.load('episode3')).rejects.toThrow('Story id episode3 not found');
        expect(storyFileAccess.path).toEqual(path);
    });

    it('should throw an error if scene id is not found', async () => {
        const storyFileDataloader = new StoryFileAccess(new StoryFileDataloader());
        await expect(storyFileDataloader.load(StoryEnum.episode1, 'episode3')).rejects.toThrow('Episode id episode3 not found in story episode1');
        expect(storyFileDataloader.path).toEqual(path);
    });
});