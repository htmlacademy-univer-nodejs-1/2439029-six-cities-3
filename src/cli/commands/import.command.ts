import {Command} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/index.js';
import {createOffer, getMongoURI} from '../../shared/helpers/index.js';
import {ConsoleLogger, Logger} from "../../shared/libs/logger/index.js";
import {DatabaseClient, MongoDatabaseClient} from "../../shared/libs/database-client/index.js";
import {OfferModel, OfferService} from "../../shared/modules/offer/index.js";
import {UserService} from "../../shared/modules/user/user-service.interface.js";
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from "./command.constant.js";
import {DefaultOfferService} from "../../shared/modules/offer/default-offer.service.js";
import {DefaultUserService, UserModel} from "../../shared/modules/user/index.js";
import {Offer} from "../../shared/types/index.js";

// npm run ts ./src/main.cli.ts -- --import mocks/mock-data.ts admin test localhost six-cities utka
export class ImportCommand implements Command {
    public readonly name = '--import';
    private userService: UserService;
    private offerService: OfferService;
    private databaseClient: DatabaseClient;
    private readonly logger: Logger;
    private salt: string;

    constructor() {
      this.onImportedLine = this.onImportedLine.bind(this);
      this.onCompleteImport = this.onCompleteImport.bind(this);

      this.logger = new ConsoleLogger();
      this.offerService = new DefaultOfferService(this.logger, OfferModel);
      this.userService = new DefaultUserService(this.logger, UserModel, OfferModel);
      this.databaseClient = new MongoDatabaseClient(this.logger);
    }

    public async execute(...parameters: string[]): Promise<void> {
        const [filename, login, password, host, dbname, salt] = parameters;
        const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
        this.salt = salt;

        await this.databaseClient.connect(uri);
        const fileReader = new TSVFileReader(filename.trim());

        fileReader.on('line', this.onImportedLine);
        fileReader.on('end', this.onCompleteImport);

        try {
            await fileReader.read();
        } catch (error) {
            this.logger.error(`Can't import data from file: ${filename}`);
        }
    }

    private async onImportedLine(line: string, resolve: () => void) {
        const offer = createOffer(line);
        await this.saveOffer(offer);
        resolve();
    }

    private onCompleteImport(count: number) {
        this.logger.info(`${count} rows imported.`);
        this.databaseClient.disconnect();
    }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }
}
