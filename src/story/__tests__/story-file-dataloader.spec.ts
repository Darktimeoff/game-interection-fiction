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

    it('should get story ids', async () => {
        const storyFileDataloader = new StoryFileDataloader();
        const storyIds = await storyFileDataloader.getStoryIds();
        expect(storyIds).toEqual([StoryEnum.episode1, StoryEnum.episode2]);
    });

    it('should get scene ids', async () => {
        const storyFileDataloader = new StoryFileDataloader();
        const sceneIds = await storyFileDataloader.getSceneIds(StoryEnum.episode1);
        expect(sceneIds).toEqual(['01', '02', '03', '04', '05', '06', '07']);
    });

    it('should throw an error if story id is not found', async () => {
        const storyFileAccess = new StoryFileAccess(new StoryFileDataloader());
        // @ts-ignore
        await expect(storyFileAccess.load('episode3')).rejects.toThrow('Story id episode3 not found');
        expect(storyFileAccess.path).toEqual(path);
    });

    it('should throw an error if scene id is not found', async () => {
        const storyFileDataloader = new StoryFileAccess(new StoryFileDataloader());
        await expect(storyFileDataloader.load(StoryEnum.episode1, 'scene3')).rejects.toThrow(`Scene id scene3 not found in story ${StoryEnum.episode1}`);
        expect(storyFileDataloader.path).toEqual(path);
    });
});