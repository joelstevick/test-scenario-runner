import { ContextFactory } from './context-factory.type';
import { Context } from './context.interface';
import { Runner } from './runner.type';

export interface Scenario {
  description: string;
  context?: Context;
  runner?: Runner
  children?: Scenario[];
}
