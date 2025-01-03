import {Command} from './command.interface.js';
import pkg from '../../../package.json' assert { type: 'json' };
import {ConsoleLogger, Logger} from "../../shared/libs/logger/index.js";

export class VersionCommand implements Command {
    public readonly name = '--version';
    private readonly logger: Logger;

    constructor() {
      this.logger = new ConsoleLogger()
    }

    public async execute(): Promise<void> {
        try {
            const version = this.readVersion();
            this.logger.info(version);
        } catch (error: unknown) {
            this.logger.error(`Failed to read version from ./package.json`);

            if (error instanceof Error) {
              this.logger.error(error.message);
            }
        }
    }

    private readVersion(): string {
        return pkg.version;
    }
}
