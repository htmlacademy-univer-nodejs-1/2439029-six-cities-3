import { injectable } from 'inversify';
import {Config} from './config.interface.js';
import {RestSchema} from "./rest.schema.js";

@injectable()
export class MockRestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(config: Partial<RestSchema>) {
    this.config = config as unknown as RestSchema;
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
