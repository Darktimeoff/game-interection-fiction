
import { StateStore } from '../state.store'
import { UserEntityInterface } from '@/user/entity/user-entity.interface'

describe('StateStore', () => {
    let stateStore: StateStore

    beforeEach(() => {
        stateStore = new StateStore()
    })

    it('should initialize with null user', () => {
        expect(stateStore.user).toBeNull()
    })

    it('should set and get user correctly', () => {
        const mockUser: UserEntityInterface = {
            id: 1,
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        stateStore.setUser(mockUser)
        expect(stateStore.user).toEqual(mockUser)
    })

    it('should allow setting user to null', () => {
        const mockUser: UserEntityInterface = {
            id: 1,
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        stateStore.setUser(mockUser)
        stateStore.setUser(null)
        expect(stateStore.user).toBeNull()
    })
})