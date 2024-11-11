import {Command} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/index.js';
import {createOffer, getErrorMessage, getMongoURI} from '../../shared/helpers/index.js';
import {ConsoleLogger, Logger} from "../../shared/libs/logger/index.js";
import {DatabaseClient, MongoDatabaseClient} from "../../shared/libs/database-client/index.js";
import {OfferModel, OfferService} from "../../shared/modules/offer/index.js";
import {DefaultFacilitiesService, FacilitiesModel, FacilitiesService} from "../../shared/modules/facilities/index.js";
import {UserService} from "../../shared/modules/user/user-service.interface.js";
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from "./command.constant.js";
import DefaultOfferService from "../../shared/modules/offer/default-offer.service.js";
import {DefaultUserService, UserModel} from "../../shared/modules/user/index.js";
import {Offer} from "../../shared/types/index.js";

export class ImportCommand implements Command {
    private userService: UserService;
    private facilitiesService: FacilitiesService;
    private offerService: OfferService;
    private databaseClient: DatabaseClient;
    private logger: Logger;
    private salt: string;

    constructor() {
      this.onImportedLine = this.onImportedLine.bind(this);
      this.onCompleteImport = this.onCompleteImport.bind(this);

      this.logger = new ConsoleLogger();
      this.offerService = new DefaultOfferService(this.logger, OfferModel);
      this.facilitiesService = new DefaultFacilitiesService(this.logger, FacilitiesModel);
      this.userService = new DefaultUserService(this.logger, UserModel);
      this.databaseClient = new MongoDatabaseClient(this.logger);
    }

    public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
        const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
        this.salt = salt;

        await this.databaseClient.connect(uri);
        const fileReader = new TSVFileReader(filename.trim());

        fileReader.on('line', this.onImportedLine);
        fileReader.on('end', this.onCompleteImport);

        try {
            await fileReader.read();
        } catch (error) {
            console.error(`Can't import data from file: ${filename}`);
            console.error(getErrorMessage(error));
        }
    }
    public getName(): string {
      return '--import';
    }

    private async onImportedLine(line: string, resolve: () => void) {
        const offer = createOffer(line);
        await this.saveOffer(offer);
        resolve();
    }

    private onCompleteImport(count: number) {
        console.info(`${count} rows imported.`);
        this.databaseClient.disconnect();
    }

  private async saveOffer(offer: Offer) {
    const facilities: string[] = [];
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    for (const { name } of offer.facilities) {
      const existFacility = await this.facilitiesService.findByFacilityNameOrCreate(name, { name });
      facilities.push(existFacility.id);
    }

    await this.offerService.create({
      facilities,
      name: offer.name,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImg: offer.previewImg,
      images: offer.images,
      flagIsPremium: offer.isPremium,
      flagIsFavourites: offer.isFavourites,
      rating: offer.rating,
      housing: offer.housing,
      countRooms: offer.countRooms,
      countPeople: offer.countPeople,
      price: offer.price,
      author: user.id,
      countComments: offer.countComments,
      coordinates: `${offer.coordinates.latitude}/${offer.coordinates.longitude}`
    });
  }
}
