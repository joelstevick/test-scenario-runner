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
      factory: async (ctxData) => {
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
      factory: async (ctxData) => {
        return () => {
          return ctxData;
        };
      },
    },
  };

  const scenarioWithChildren: Scenario = {
    description: 'test',
    context: {
      data: {
        id: 1,
      },
      factory: async (ctxData) => {
        return () => {
          return ctxData;
        };
      },
    },

    children: [
      {
        description: 'child',
        runner: (ctx) => {},
      },
    ],
  };
  it('should call the runner with the context', async () => {
    const runnerSpy = spyOn(scenarioWithRunner, 'runner');

    await runScenario(scenarioWithRunner, null);
    expect(runnerSpy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should not fail in the case that no runner is provided', async () => {
    await runScenario(scenarioWithNoRunner, null);
  });

  it('should call child runners with the context', async () => {
    const runnerSpy = spyOn(scenarioWithChildren.children![0], 'runner');

    await runScenario(scenarioWithChildren, { foo: 'bar' });
    expect(runnerSpy).toHaveBeenCalledWith({ id: 1 });
  });
});
