
import { QueryBus } from '@/generic/cqrs/query/query-bus'
import { QueryHandlerInterface } from '@/generic/cqrs/query/interface/query-handler.interface'
import { Query } from '@/generic/cqrs/query/query'
import { QueryBusInterface } from '@/generic/cqrs/query/interface/query-bus.interface'

// Mock query and handler for testing
class TestQuery extends Query<string> {
    constructor(public readonly data: string) {
        super()
    }
}

class TestQueryHandler implements QueryHandlerInterface<TestQuery> {
    public async execute(query: TestQuery): Promise<string> {
        return `Handled: ${query.data}`
    }
}

class TestQuery2 extends Query<string> {
    constructor(public readonly data: string) {
        super()
    }
}

describe('QueryBus', () => {
    let queryBus: QueryBusInterface

    beforeEach(() => {
        queryBus = new QueryBus()
    })

    describe('execute', () => {
        it('should execute query with registered handler', async () => {
            // Arrange
            queryBus.register(TestQuery, new TestQueryHandler())
            const query = new TestQuery('test data')

            // Act
            const result = await queryBus.execute(query)

            // Assert
            expect(result).toBe('Handled: test data')
        })

        it('should throw error when handler is not found', async () => {
            const query = new TestQuery2('test data')

            // Act & Assert
            await expect(queryBus.execute(query)).rejects.toThrow(
                'Handler for query TestQuery2 not found'
            )
        })
    })
})