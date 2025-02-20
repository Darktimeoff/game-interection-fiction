import { CommandBus } from "@/generic/cqrs/command/bus/bus"
import { UpdateStoryUserCommandHandler } from "@/story-user/command-handler/update-story-user-command.handler"
import { UpdateStoryUserCommand } from "@/story-user/command/update-story-user.command"
import storyUserService from "@/story-user/story-user.container"
import { CreateUserCommand } from "@/client/state/command/create-user.command"
import { CreateUserCommandHandler } from "@/client/state/command-handler/create-user.command-handler"
import stateUserService from "@/client/state/state.container"
import { SelectUserCommandHandler } from "@/client/state/command-handler/select-user-command.handler"
import { SelectUserCommand } from "@/client/state/command/select-user.command"
import { DeleteUserCommandHandler } from "@/client/state/command-handler/delete-user.command-handler"
import { DeleteUserCommand } from "@/client/state/command/delete-user.command"

export const commandBus = new CommandBus()

commandBus.register(UpdateStoryUserCommand, new UpdateStoryUserCommandHandler(storyUserService))
commandBus.register(CreateUserCommand, new CreateUserCommandHandler(stateUserService))
commandBus.register(SelectUserCommand, new SelectUserCommandHandler(stateUserService))  
commandBus.register(DeleteUserCommand, new DeleteUserCommandHandler(stateUserService))