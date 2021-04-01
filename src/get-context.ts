import { Scenario } from './model/scenario.interface';

export async function getContext(scenario: Scenario) {
  if (typeof scenario.context?.factory === 'function') {
    return await scenario.context.factory(scenario.context.data);
  } else {
    return;
  }
}
