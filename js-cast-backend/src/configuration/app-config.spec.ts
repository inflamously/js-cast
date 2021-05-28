import { AppConfig } from './app-config';

describe("app.config tests", () => {
    let instance = AppConfig;

    test("should have AppConfig instance defined", () => {
        expect(instance).toBeDefined();
    })

    test('should have config defined', () => {
        expect(instance.root).toBeDefined();
    })
})