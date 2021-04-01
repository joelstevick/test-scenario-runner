import { getContext } from './get-context';
import { Context } from './model/context.interface';
import { Scenario } from './model/scenario.interface';

export async function runScenario(scenario: Scenario, contextData: any) {
  // output the description
  console.log(scenario.description);
  
  // get the context
  const contextFn = getContext(scenario);

  if (typeof contextFn === 'function') {
    contextData = contextFn();
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
