import { getContext } from '../../get-context';
import { Scenario } from '../../model/scenario.interface';
import { runScenario } from '../../run-scenario';

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
    runner: (ctx) => { },
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

  it('should be obtained from the higher order function in scenario.runner', async () => {
    const runnerSpy = spyOn(scenarioWithRunner, 'runner');

    await runScenario(scenarioWithRunner, null);
    expect(runnerSpy).toHaveBeenCalled();
  });

  it('should not fail in the case that no context is provided', async () => {
    await runScenario(scenarioWithNoRunner, null);
  });
});
