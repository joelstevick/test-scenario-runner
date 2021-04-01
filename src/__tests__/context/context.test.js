const { getContext } = require('../../get-context');

describe('Context', () => {
  const scenarioWithFactory = {
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
    scenarios: [
      {
        run: () => {},
      },
    ],
  };

  const scenarioWithContextOnly = {
    context: {},
    scenarios: [
      {
        run: () => {},
      },
    ],
  };
  const scenarioWithNoContext = {};

  it('should be obtained from the higher order function in context.factory', async () => {
    const contextFn = await getContext(scenarioWithFactory);

    expect(typeof contextFn).toBe('function');

    await expect(contextFn().id).toBe(1);
  });

  it('should not fail in the case that no factory is provided', async () => {
    const contextFn = await getContext(scenarioWithContextOnly);
    await expect(contextFn).toBeUndefined();
  });

  it('should not fail in the case that no context is provided', async () => {
    const contextFn = await getContext(scenarioWithNoContext);
    await expect(contextFn).toBeUndefined();
  });
});
