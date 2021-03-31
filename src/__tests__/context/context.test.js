const { getContext } = require('../../get-context');

describe('Context', () => {
  const scenarioWithFactory = {
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

  it('should be obtained from the higher order function in context.factory', () => {
    expect(getContext(scenarioWithFactory)().id).toBe(1);
  });

  it('should not fail in the case that no factory is provided', () => {
    expect(getContext(scenarioWithContextOnly)).toBeUndefined();
  });

  it('should not fail in the case that no context is provided', () => {
    expect(getContext(scenarioWithNoContext)).toBeUndefined();
  });
});
