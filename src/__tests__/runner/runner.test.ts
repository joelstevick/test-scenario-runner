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

  let contextFn_withChildren: any;
  let contextFn_withRunner: any;

  beforeEach(async () => {
    contextFn_withChildren = await getContext(scenarioWithChildren);
    contextFn_withRunner = await getContext(scenarioWithRunner);
  });
  it('should call the runner with the context', async () => {
    const runnerSpy = spyOn(scenarioWithRunner, 'runner');

    runScenario(scenarioWithRunner, contextFn_withRunner());
    expect(runnerSpy).toHaveBeenCalledWith(contextFn_withRunner());
  });

  it('should not fail in the case that no runner is provided', async () => {
    runScenario(scenarioWithNoRunner, null);
  });

  it('should call child runners with the context', async () => {
    const runnerSpy = spyOn(scenarioWithChildren.children![0], 'runner');

    runScenario(scenarioWithChildren, contextFn_withChildren());
    expect(runnerSpy).toHaveBeenCalledWith(contextFn_withChildren());
  });
});
