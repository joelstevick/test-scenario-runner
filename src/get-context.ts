import { Scenario } from "./model/scenario.interface";

export function getContext(scenario: Scenario) {

    if (typeof scenario.context?.factory === 'function') {
        return scenario.context.factory(scenario.context.data);
    }

}