import { CommandInterface } from "@/generic/cqrs/command/interface/command.interface";
import { StoryRenderProgressInterface } from "@/client/story-render/interface/story-render-progress.interface";

export class UpdateProgressCommand implements CommandInterface{
    constructor(
        public readonly progress: StoryRenderProgressInterface
    ){}
}