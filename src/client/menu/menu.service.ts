import { Log, LogClass } from "@/generic/logging/log.decorator";
import { MenuItemActionInterface, MenuItemInterface } from "./interface/menu-item.interface";
import { LoggerConsole, LoggerInterface } from "@/generic/logging/logger.service";
import { ValidationError } from "@/generic/errors/validation.error";
import { MenuActionEnum } from "./enum/menu-action.enum";
import { ReadlineService } from "@/generic/readline/readline.service";
import { CommandBusInterface } from "@/generic/cqrs/command/interface/command-bus.interface";
import { CreateUserCommand } from "@/client/state/command/create-user.command";
import { SelectUserCommand } from "@/client/state/command/select-user.command";
import { DeleteUserCommand } from "@/client/state/command/delete-user.command";
import { QueryBusInterface } from "@/generic/cqrs/query/interface/query-bus.interface";
import { GetAllUserQuery } from "@/client/state/query/get-all-user.query";
import { sleep } from "@/generic/utils/sleep.utils";

@LogClass()
export class MenuService {
    private readonly SHOW_MESSAGE_DELAY = 1000
    constructor(
        private readonly queryBus: QueryBusInterface,
        private readonly commandBus: CommandBusInterface,
        private readonly logger: LoggerInterface = new LoggerConsole('MenuService:: '),
        private readonly rl: ReadlineService = new ReadlineService()
    ) {
    }

    @Log('getMenu', 'menu', (error) => `Failed to get menu: ${error}`)
    async getMenu(): Promise<void | MenuActionEnum> {
        try {
            console.clear()
            this.getMenuItems().forEach(this.prepareMenuItem)

            const userInput = await this.getUserInput('Выберите пункт меню:')
            this.validateUserInput(userInput, this.getMenuItems())

            this.logger.log(`User input: ${userInput}`)

            const menuItem = this.getMenuItems().find(item => item.id === Number(userInput))
            if(!menuItem?.action) {
                throw new Error('Not implemented')
            }

            await menuItem.action()

            if(menuItem.id === MenuActionEnum.DELETE_USER) {
                await this.getMenu()
            }
           
            return menuItem.id
        } catch (error) {
            if(error instanceof ValidationError) {
                await this.showMessage(error.message)
                await this.getMenu()
            }

            throw error
        }
    }

    private async getMenuSelectUser(): Promise<void> {
        try {
            console.clear()
            const {title} = await this.getMenuUsers()
            await this.commandBus.execute(new SelectUserCommand(title))
            await this.showMessage(`Выбран пользователь: ${title}`)
        } catch (error) {
            if(error instanceof ValidationError) {
                await this.showMessage(error.message)
                await this.getMenuSelectUser()
            }
        }
    }

    private async getMenuUsers(): Promise<MenuItemInterface> {
        const users = await this.queryBus.execute(new GetAllUserQuery())
        if(users.length === 0) {
            await this.showMessage('Нет пользователей')
            await sleep(2000)
            await this.getMenu()
        }

        const menuItems = users.map((user, index) => ({
            id: index + 1,
            title: user.name,
        }))

        menuItems.forEach(this.prepareMenuItem)

        const userInput = await this.getUserInput('Выберите пользователя: ')
        this.validateUserInput(userInput, menuItems)

        return menuItems.find(item => item.id === Number(userInput))!
    }

    private async getMenuDeleteUser(): Promise<void> {
        try {
            console.clear()
            const {title} = await this.getMenuUsers()
            await this.commandBus.execute(new DeleteUserCommand(title))
            await this.showMessage(`Персонаж ${title} успешно удален`)
        } catch (error) {
            if(error instanceof ValidationError) {
                await this.showMessage(error.message)
                await this.getMenu()
            }
        }
    }

    private async getMenuCreateUser(): Promise<void> {
        try {
            console.clear()
            const userName = await this.getUserInput('Введите имя персонажа:')

            await this.commandBus.execute(new CreateUserCommand(userName))

            await this.showMessage(`Персонаж ${userName} успешно создан`)
        } catch (error) {
            if(error instanceof ValidationError) {
                await this.showMessage(error.message)
                await this.getMenuCreateUser()
            }

            throw error
        }
    }

    private async getUserInput(question: string): Promise<string> {
        this.rl.resume()

        try {
            return await this.rl.question(question)
        } catch (error) {
            throw new Error('Failed to get user input')
        } finally {
            this.rl.pause()
        }
    }

    private prepareMenuItem(item: MenuItemInterface): void {
        console.log(`${item.id}. ${item.title}`)
    }

    private getMenuItems(): MenuItemActionInterface[] {
        return [
            {
                "id": MenuActionEnum.START_GAME,
                "title": "Играть за персонажа",
                "action": async () => await this.getMenuSelectUser()
            },
            {
                "id": MenuActionEnum.CREATE_USER,
                "title": "Создать нового персонажа",
                "action": async () => await this.getMenuCreateUser()
            }, 
            {
                "id": MenuActionEnum.DELETE_USER,
                "title": "Удалить персонажа",
                "action": async () => await this.getMenuDeleteUser()
            },
            {
                "id": MenuActionEnum.EXIT,
                "title": "Выйти",
                "action": async () => process.exit(1)
            }
        ]
    }

    private validateUserInput(input: string, items: MenuItemInterface[]): void {
        if(Number.isNaN(Number(input))) {
            throw new ValidationError('Invalid input should be a number')
        }

        if(!items.find(item => item.id === Number(input))) {
            throw new ValidationError('Invalid menu item selected')
        }
    }

    private async showMessage(message: string): Promise<void> {
        console.log(message)
        await sleep(this.SHOW_MESSAGE_DELAY)
    }
}   