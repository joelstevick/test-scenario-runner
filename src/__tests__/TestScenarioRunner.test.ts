import { TestScenarioRunner } from '../index';

test('My Greeter', () => {
  expect(TestScenarioRunner('Carl')).toBe('Hello Carl');
});
