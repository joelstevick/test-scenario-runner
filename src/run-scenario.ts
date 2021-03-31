import { getContext } from './get-context';
import { Context } from './model/context.interface';
import { Scenario } from './model/scenario.interface';

export async function runScenario(scenario: Scenario, context: Context | null | undefined) {
  if (typeof scenario?.runner === 'function') {
    const contextFn = getContext(scenario);

    if (typeof contextFn === 'function') {
      context = contextFn();
    }

    await scenario.runner(context);
  }
  if (scenario.children && scenario.children.length > 0) {
    for (const childScenario of scenario.children) {
      await runScenario(childScenario, context);
    }
  }
}
