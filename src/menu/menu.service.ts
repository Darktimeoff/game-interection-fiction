import { Log, LogClass } from "@/generic/logging/log.decorator";
import { UserService } from "@/user/user.service";
import { MenuItemInterface } from "./interface/menu-item.interface";
import readline from 'node:readline';
import { LoggerConsole, LoggerInterface } from "@/generic/logging/logger.service";
@LogClass()
export class MenuService {
    private readonly rl: readline.Interface

    constructor(
        public readonly userService: UserService,
        private readonly logger: LoggerInterface = new LoggerConsole('MenuService:: ')
    ) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    @Log('getMenu', 'menu', (error) => `Failed to get menu: ${error}`)
    async getMenu(): Promise<void> {
        try {
            this.rl.resume()

            console.clear()
            this.getMenuItems().forEach(this.prepareMenuItem)

            const userInput = await this.getUserInput('Выберите пункт меню:')
            this.validateUserInput(userInput)
            
            this.logger.log(`User input: ${userInput}`)
            this.rl.pause()
        } catch (error) {
            this.getMenu()
            this.logger.error(`Failed to get menu: ${error}`)
        }
    }

    private async getUserInput(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer)
            })
        })
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

    private validateUserInput(input: string): void {
        if(Number.isNaN(Number(input))) {
            throw new Error('Invalid input should be a number')
        }

        const menuItems = this.getMenuItems()
        if(!menuItems.find(item => item.id === Number(input))) {
            throw new Error('Invalid menu item selected')
        }
    }
}   