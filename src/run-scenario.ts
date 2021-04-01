import { getContext } from './get-context';
import { Context } from './model/context.interface';
import { Scenario } from './model/scenario.interface';
import * as colors from 'colors/safe';

export function runScenario(scenario: Scenario, contextData: any) {
  // output the description
  process.stdout.write(colors.white(scenario.description) + '\n');

  // optional runner
  if (typeof scenario.runner === 'function') {
    scenario.runner(contextData);
  }

  // recurse
  if (scenario.children && scenario.children.length > 0) {
    for (const childScenario of scenario.children) {
      runScenario(childScenario, contextData);
    }
  }
}
