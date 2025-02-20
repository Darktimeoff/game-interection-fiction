import { Bus } from "../bus"

// Mock classes for testing
class TestQuery {
    constructor(public readonly data: string) {}
}

class TestQueryHandler {
    execute(query: TestQuery): string {
        return `Handled: ${query.data}`
    }
}

describe('Bus', () => {
    let bus: Bus<TestQuery, TestQueryHandler>
    let handler: TestQueryHandler

    beforeEach(() => {
        bus = new Bus()
        handler = new TestQueryHandler()
    })


    it('should register a handler', () => {
        // Act
        bus.register(TestQuery, handler)

        // Assert
        expect(bus['mapped'].get(TestQuery)).toBe(handler)
    })
    


    it('should unregister a handler', () => {
        // Arrange
        bus.register(TestQuery, handler)

        // Act
        bus.unregister(TestQuery)

        // Assert
        expect(bus['mapped'].has(TestQuery)).toBeFalsy()
    })
 
})