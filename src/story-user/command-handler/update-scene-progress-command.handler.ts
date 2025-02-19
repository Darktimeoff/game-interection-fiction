import { CommandHandlerInterface } from "@/generic/cqrs/command/command-handler.interface";
import { UpdateSceneProgressCommand } from "../command/update-scene-progress.command";
import { LogClass } from "@/generic/logging/log.decorator";

@LogClass()
export class UpdateSceneProgressCommandHandler implements CommandHandlerInterface<UpdateSceneProgressCommand>{
    execute(command: UpdateSceneProgressCommand): Promise<void> {
        console.log('😀', command)
        return Promise.resolve()
    }
}
