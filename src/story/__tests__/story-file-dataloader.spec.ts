import { StoryFileDataloader } from "@/story/story-file.dataloader";


describe('StoryFileDataloader', () => {
    it('should load a story', async () => {
        const storyFileDataloader = new StoryFileDataloader();
        const story = await storyFileDataloader.load();
        expect(story.id).toBeTruthy()
        expect(story).toBeTruthy()
    });

    it('should throw an error if episode id is not found', async () => {
        const storyFileDataloader = new StoryFileDataloader();
        await expect(storyFileDataloader.load('episode3')).rejects.toThrow('Episode id episode3 not found');
    });

    it('should throw an error if scene id is not found', async () => {
        const storyFileDataloader = new StoryFileDataloader();
        await expect(storyFileDataloader.load('episode1', 'scene3')).rejects.toThrow('Scene id scene3 not found in episode episode1');
    });
});