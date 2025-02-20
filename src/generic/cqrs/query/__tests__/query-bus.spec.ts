
import { QueryBus } from '@/generic/cqrs/query/query-bus'
import { QueryInterface } from '@/generic/cqrs/query/interface/query.interface'
import { QueryHandlerInterface } from '@/generic/cqrs/query/interface/query-handler.interface'

// Mock query and handler for testing
class TestQuery implements QueryInterface {
    constructor(public readonly data: string) {}
}

class TestQueryHandler implements QueryHandlerInterface<TestQuery> {
    public async execute(query: TestQuery): Promise<string> {
        return `Handled: ${query.data}`
    }
}

class TestQuery2 implements QueryInterface {
    constructor(public readonly data: string) {}
}

describe('QueryBus', () => {
    let queryBus: QueryBus

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