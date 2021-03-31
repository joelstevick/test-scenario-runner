import { ContextFactory } from './context-factory.type';
import { Context } from './context.interface';

export interface Scenario {
  description: string;
  context: Context;
  runer;
  children: Scenario[];
}
