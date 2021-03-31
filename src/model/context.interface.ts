import { ContextFactory } from './context-factory.type';

export interface Context {
  data?: unknown;
  factory?: ContextFactory;
}
