import { ContextFactory, Context, Runner, Scenario } from './model';
import { runScenario as _runScenario } from './run-scenario';
import { getContext } from './get-context';

export { ContextFactory, Context, Runner, Scenario };
export { getContext };

export function runScenario(scenario: Scenario, context: Context) {
  return _runScenario(scenario, context);
}
