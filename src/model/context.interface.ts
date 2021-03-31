import { ContextFactory } from './context-factory.type';

export interface Context {
  data?: any;
  factory?: ContextFactory;
}
