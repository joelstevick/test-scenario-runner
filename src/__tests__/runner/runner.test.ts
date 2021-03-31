import { getContext } from '../../get-context';
import { Scenario } from '../../model/scenario.interface';

describe('Runner', () => {
  const scenarioWithRunner: Scenario = {
    description: 'test',
    context: {
      data: {
        id: 1,
      },
      factory: (ctxData) => {
        return () => {
          return ctxData;
        };
      },
    },
    runner: (ctx) => {},
  };

  const scenarioWithNoRunner: Scenario = {
    description: 'test',
    context: {
      data: {
        id: 1,
      },
      factory: (ctxData) => {
        return () => {
          return ctxData;
        };
      },
    },
  };

  it('should be obtained from the higher order function in scenario.runner', () => {
    const runnerSpy = spyOn(scenarioWithRunner, 'runner');

    expect(getContext(scenarioWithRunner)().id).toBe(1);
  });

  it('should not fail in the case that no context is provided', () => {
    expect(getContext(scenarioWithNoRunner)).toBeUndefined();
  });
});
