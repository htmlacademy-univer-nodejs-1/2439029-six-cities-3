import got from 'got';
import {TSVFileWriter} from '../../shared/libs/file-writer/index.js';
import {Command} from './command.interface.js';
import {MockServerData} from '../../shared/types/index.js';
import {TSVOfferGenerator} from '../../shared/libs/offer-generator/index.js';
import {ConsoleLogger, Logger} from "../../shared/libs/logger/index.js";

// npm run ts ./src/main.cli.ts -- --generate 100 mockdata.ts http://localhost:3123/api
export class GenerateCommand implements Command {
    public readonly name = '--generate';
    private initialData: MockServerData;
    private readonly logger: Logger;

    constructor() {
      this.logger = new ConsoleLogger()
    }

    public async execute(...parameters: string[]): Promise<void> {
        const [count, filepath, url] = parameters;
        const offerCount = Number.parseInt(count, 10);

        try {
            await this.load(url);
            await this.write(filepath, offerCount);
            this.logger.info(`File ${filepath} was created!`);
        } catch (error: unknown) {
            this.logger.error('Can\'t generate data');
        }
    }

    private async load(url: string) {
        try {
            this.initialData = await got.get(url).json();
        } catch {
            this.logger.error(`Can't load data from ${url}`);
        }
    }

    private async write(filepath: string, offerCount: number) {
        const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
        const tsvFileWriter = new TSVFileWriter(filepath);

        for (let i = 0; i < offerCount; i++) {
            await tsvFileWriter.write(tsvOfferGenerator.generate());
        }
    }
}
