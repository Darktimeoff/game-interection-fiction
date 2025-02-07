import { StateUserService } from '@/client/state/state-user.service'
import { StateStore } from '@/client/state/state.store'
import { UserService } from '@/user/user.service'
import { ValidationError } from '@/generic/errors/validation.error'
import { UserEntityInterface } from '@/user/entity/user-entity.interface'

jest.mock('@/client/state/state.store')
jest.mock('@/user/user.service')

describe('StateUserService', () => {
    let stateUserService: StateUserService
    let stateStore: jest.Mocked<StateStore>
    let userService: jest.Mocked<UserService>

    const mockUser: UserEntityInterface = {
        id: 1,
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(() => {
        stateStore = new StateStore() as jest.Mocked<StateStore>
        userService = new UserService({} as any) as jest.Mocked<UserService>
        stateUserService = new StateUserService(stateStore, userService)
    })

    describe('createUser', () => {
        it('should create user and set it in store', async () => {
            userService.findByName = jest.fn().mockResolvedValue(null)
            userService.createUser = jest.fn().mockResolvedValue(mockUser)
            stateStore.setUser = jest.fn()

            const result = await stateUserService.createUser('Test User')

            expect(result).toEqual(mockUser)
            expect(userService.createUser).toHaveBeenCalledWith({ name: 'Test User' })
            expect(stateStore.setUser).toHaveBeenCalledWith(mockUser)
        })

        it('should throw ValidationError if user already exists', async () => {
            userService.findByName = jest.fn().mockResolvedValue(mockUser)

            await expect(stateUserService.createUser('Test User'))
                .rejects
                .toThrow(ValidationError)
        })
    })

    describe('getUsers', () => {
        it('should return users list', async () => {
            const mockUsers = [mockUser]
            userService.getUsers = jest.fn().mockResolvedValue(mockUsers)

            const result = await stateUserService.getUsers()

            expect(result).toEqual(mockUsers)
            expect(userService.getUsers).toHaveBeenCalled()
        })
    })

    describe('selectUserByName', () => {
        it('should select user and set it in store', async () => {
            userService.findByName = jest.fn().mockResolvedValue(mockUser)
            stateStore.setUser = jest.fn()

            const result = await stateUserService.selectUserByName('Test User')

            expect(result).toEqual(mockUser)
            expect(stateStore.setUser).toHaveBeenCalledWith(mockUser)
        })

        it('should throw ValidationError if user not found', async () => {
            userService.findByName = jest.fn().mockResolvedValue(null)

            await expect(stateUserService.selectUserByName('Test User'))
                .rejects
                .toThrow(ValidationError)
        })
    })

    describe('deleteUserByName', () => {
        it('should delete user successfully', async () => {
            stateStore.setUser({ ...mockUser, name: 'Other User' })
            userService.deleteByName = jest.fn().mockResolvedValue(true)

            await stateUserService.deleteUserByName('Test User')

            expect(userService.deleteByName).toHaveBeenCalledWith('Test User')
        })

        it('should throw ValidationError when trying to delete current user', async () => {
            stateStore.setUser({ ...mockUser, name: 'Test User' })

            await expect(stateUserService.deleteUserByName('Test User'))
                .rejects
                .toThrow(ValidationError)
        })

        it('should throw ValidationError if user not found', async () => {
            stateStore.setUser(null)
            userService.deleteByName = jest.fn().mockResolvedValue(false)

            await expect(stateUserService.deleteUserByName('Test User'))
                .rejects
                .toThrow(ValidationError)
        })
    })
})