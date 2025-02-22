
import storyUserService from "@/story-user/story-user.container"
import { CreateUserCommand } from "@/client/state/command/create-user.command"
import { CreateUserCommandHandler } from "@/client/state/command-handler/create-user.command-handler"
import stateUserService from "@/client/state/state.container"
import { SelectUserCommandHandler } from "@/client/state/command-handler/select-user-command.handler"
import { SelectUserCommand } from "@/client/state/command/select-user.command"
import { DeleteUserCommandHandler } from "@/client/state/command-handler/delete-user.command-handler"
import { DeleteUserCommand } from "@/client/state/command/delete-user.command"
import { CommandBus } from "@/generic/cqrs/command/command-bus"
import { SelectStoryChoiceCommandByUserId } from "@/story-user/command/select-story-choice-by-user-id.command"
import { SelectStoryChoiceCommandByUserIdHandler } from "@/story-user/command-handler/select-story-choice-by-user-id.command-handler"
import { storyHandleService } from "@/story/story.container"
import { UpdateStoryStateCommandHandler } from "@/story-user/command-handler/update-story-user-command.handler"
import { UpdateStoryStateCommand } from "@/story-user/command/update-story-state.command"

export const commandBus = new CommandBus()

commandBus.register(UpdateStoryStateCommand, new UpdateStoryStateCommandHandler(storyUserService))
commandBus.register(CreateUserCommand, new CreateUserCommandHandler(stateUserService))
commandBus.register(SelectUserCommand, new SelectUserCommandHandler(stateUserService))  
commandBus.register(DeleteUserCommand, new DeleteUserCommandHandler(stateUserService))
commandBus.register(SelectStoryChoiceCommandByUserId, new SelectStoryChoiceCommandByUserIdHandler(storyUserService, storyHandleService))