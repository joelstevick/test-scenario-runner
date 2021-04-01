import { getContext } from './get-context';
import { Context } from './model/context.interface';
import { Scenario } from './model/scenario.interface';
import * as colors from 'colors/safe';

export async function runScenario(scenario: Scenario, contextData: any) {
  // output the description
  process.stdout.write(colors.green(scenario.description) + '\n');

  // get the context
  const contextFn = getContext(scenario);

  if (typeof contextFn === 'function') {
    contextData = await contextFn();
  }

  // optional runner
  if (typeof scenario.runner === 'function') {
    await scenario.runner(contextData);
  }

  // recurse
  if (scenario.children && scenario.children.length > 0) {
    for (const childScenario of scenario.children) {
      await runScenario(childScenario, contextData);
    }
  }
}
