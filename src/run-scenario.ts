import { getContext } from './get-context';
import { Context } from './model/context.interface';
import { Scenario } from './model/scenario.interface';

export async function runScenario(scenario: Scenario, contextData: any) {

    if (typeof scenario.runner === 'function') {
        const contextFn = getContext(scenario);

        if (typeof contextFn === 'function') {
            contextData = contextFn();
        }

        await scenario.runner(contextData);
    }
    if (scenario.children && scenario.children.length > 0) {
        for (const childScenario of scenario.children) {
            await runScenario(childScenario, contextData);
        }
    }
}
