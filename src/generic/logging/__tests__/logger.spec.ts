import { EnvService } from "@/generic/enviroment/enviroment-service";
import { LoggerConsole } from "@/generic/logging/logger.service";

describe('Logger', () => {
    let mockConsole: jest.SpyInstance[]
    let mockEnvService: EnvService
    let logger: LoggerConsole
    const date = new Date().toISOString()
    const context = 'context'

    beforeEach(() => {
        mockEnvService = new EnvService();
        mockEnvService.get = jest.fn().mockReturnValue(true);

        logger = new LoggerConsole(context, mockEnvService);
        // @ts-ignore
        logger.getDate = jest.fn().mockReturnValue(`[${date}]`);


        mockConsole = [
            jest.spyOn(console, 'log').mockImplementation(),
            jest.spyOn(console, 'error').mockImplementation(),
            jest.spyOn(console, 'warn').mockImplementation(),
        ]
    })

    function getMessageText(message: string): string {
        return `\n[${date}] ${context}${message}`
    }

    afterEach(() => {
        mockConsole.forEach(mock => mock.mockRestore())
    })

    it('should log message', () => {
        logger.log('test');
        expect(mockConsole[0]).toHaveBeenCalledWith(getMessageText('test'));
    });

    it('should log error message', () => {
        logger.error('test');
        expect(mockConsole[1]).toHaveBeenCalledWith(getMessageText('test'));
    });

    it('should log warn message', () => {
        logger.warn('test');
        expect(mockConsole[2]).toHaveBeenCalledWith(getMessageText('test'));
    });

    it('should not log message if logging is disabled', () => {
        mockEnvService.get = jest.fn().mockReturnValue(false);

        logger.log('test');
        expect(mockConsole[0]).not.toHaveBeenCalled();
        logger.error('test');
        expect(mockConsole[1]).not.toHaveBeenCalled();
        logger.warn('test');
        expect(mockConsole[2]).not.toHaveBeenCalled();
    });
});