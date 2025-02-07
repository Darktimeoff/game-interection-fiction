import { Log, LogClass } from "@/generic/logging/log.decorator";
import { MenuItemInterface } from "./interface/menu-item.interface";
import readline from 'node:readline';
import { LoggerConsole, LoggerInterface } from "@/generic/logging/logger.service";
import { MenuActionsService } from "./menu-actions.service";
import { ValidationError } from "@/generic/errors/validation.error";

@LogClass()
export class MenuService {
    private readonly rl: readline.Interface

    constructor(
        private readonly menuActionsService: MenuActionsService,
        private readonly logger: LoggerInterface = new LoggerConsole('MenuService:: '),

    ) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    @Log('getMenu', 'menu', (error) => `Failed to get menu: ${error}`)
    async getMenu(): Promise<void> {
        try {
            console.clear()
            this.getMenuItems().forEach(this.prepareMenuItem)

            const userInput = await this.getUserInput('Выберите пункт меню:')
            this.validateUserInput(userInput, this.getMenuItems())

            this.logger.log(`User input: ${userInput}`)

            const menuItem = this.getMenuItems().find(item => item.id === Number(userInput))
            if(menuItem?.action) {
                await menuItem.action()
            } else {
                throw new Error('Not implemented')
            }
        } catch (error) {
            if(error instanceof ValidationError) {
                console.log(error.message)
                await this.getMenu()
            }

            throw error
        }
    }

    private async getMenuCreateUser(): Promise<void> {
        try {
            const userName = await this.getUserInput('Введите имя персонажа:')

            await this.menuActionsService.createUser(userName)

            console.log(`Персонаж ${userName} успешно создан`)
        } catch (error) {
            if(error instanceof ValidationError) {
                console.log(error.message)
                await this.getMenuCreateUser()
            }

            throw error
        }
    }

    private async getUserInput(question: string): Promise<string> {
        this.rl.resume()

        try {
            return await new Promise((resolve) => {
                this.rl.question(question, (answer) => {
                    resolve(answer)
                })
            })
        } catch (error) {
            throw new Error('Failed to get user input')
        } finally {
            this.rl.pause()
        }
    }

    private prepareMenuItem(item: MenuItemInterface): void {
        console.log(`${item.id}. ${item.title}`)
    }

    private getMenuItems(): MenuItemInterface[] {
        return [
            {
                "id": 1,
                "title": "Играть за персонажа",
            },
            {
                "id": 2,
                "title": "Создать новго персонажа",
                "action": async () => await this.getMenuCreateUser()
            }, 
            {
                "id": 3,
                "title": "Удалить персонажа",
            },
            {
                "id": 4,
                "title": "Выйти",
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
}   