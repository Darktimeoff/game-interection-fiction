import { ServiceLocator } from "@/generic/service-locator/service-locator.service";

describe('Service Locator', () => {
    let serviceLocator: ServiceLocator;

    class TestService {
        name: string;
        constructor() {
            this.name = 'test';
        }
    }

    beforeEach(() => {
        serviceLocator = new ServiceLocator();
    })

    it('should be singleton', () => {
        const serviceLocator2 = new ServiceLocator();
        expect(serviceLocator).toBe(serviceLocator2);
    })

    it('should be able to get a service', () => {
        const service = serviceLocator.get<TestService>(TestService) 
        expect(service).toBeNull();
    })

    it('should be able to register a service', () => {
        const service = new TestService();
        serviceLocator.register(TestService, service);
        const service2 = serviceLocator.get<TestService>(TestService);
        expect(service2).toBe(service);
    })

    it('should be able to unregister a service', () => {
        const service = new TestService();
        serviceLocator.register(TestService, service);
        serviceLocator.unregister(TestService);
        const service2 = serviceLocator.get<TestService>(TestService);
        expect(service2).toBeNull();
    })

    it('should be able to check if a service is registered', () => {
        const service = new TestService();
        serviceLocator.register(TestService, service);
        const isRegistered = serviceLocator.has(TestService);
        expect(isRegistered).toBeTruthy();
    })
})