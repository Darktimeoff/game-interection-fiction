import { CommandBus } from "@/generic/cqrs/command/bus/bus"
import { UpdateSceneProgressCommandHandler } from "@/story-user/command-handler/update-scene-progress-command.handler"
import { UpdateSceneProgressCommand } from "@/story-user/command/update-scene-progress.command"

export const commandBus = new CommandBus()

commandBus.register(UpdateSceneProgressCommand, new UpdateSceneProgressCommandHandler())