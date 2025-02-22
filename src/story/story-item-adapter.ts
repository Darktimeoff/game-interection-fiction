
import { DialogInterface } from "./interfaces/dialog.interface";
import { SceneInterface } from "./interfaces/scene.interface";
import { StoryItemInterface } from "./interfaces/story-item.interface";
import { StoryInterface } from "./interfaces/story.interface";

export class StoryAdapter implements StoryItemInterface {
    constructor(private readonly story: StoryInterface) {}

    get id(): StoryItemInterface['id'] {
        return this.story.id
    }

    get text(): StoryItemInterface['text'] {
        return this.story.description
    }

    get title(): StoryItemInterface['title'] {
        return this.story.title
    }

    get choices(): StoryItemInterface['choices'] {
        return []
    }
}

export class SceneAdapter implements StoryItemInterface {
    constructor(private readonly scene: SceneInterface) {}

    get id(): StoryItemInterface['id'] {
        return this.scene.id
    }

    get title(): StoryItemInterface['title'] {
        return ""
    }

    get text(): StoryItemInterface['text'] {
        return this.scene.description
    }

    get choices(): StoryItemInterface['choices'] {
        return []
    }
}

export class DialogAdapter implements StoryItemInterface {
    constructor(private readonly dialog: DialogInterface) {}

    get id(): StoryItemInterface['id'] {
        return this.dialog.id
    }

    get title(): StoryItemInterface['title'] {
        return this.dialog.character
    }

    get text(): StoryItemInterface['text'] {
        return this.dialog.text
    }

    get choices(): StoryItemInterface['choices'] {
        return this.dialog.choices || []
    }
}