import mongoose, {Mongoose} from 'mongoose';
import { inject, injectable } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: Mongoose | null = null;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;

    while (attempt < RETRY_COUNT) {
      console.log('uri', uri);
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    this.logger.error(`The connection to the database could not be established. Error: ${attempt}`);
    throw new Error('Error connecting to the database');
  }

  private async _connect(uri: string): Promise<void> {
    this.mongoose = await this._connectWithRetry(uri);
    this.isConnected = true;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('The MongoDB client has already initialized');
    }

    this.logger.info('Trying to connect to MongoDB');
    await this._connect(uri);
    this.logger.info('Connection to MongoDB is established');
  }

  private async _disconnect(): Promise<void> {
    await this.mongoose?.disconnect();
    this.isConnected = false;
    this.mongoose = null;
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this._disconnect();
    this.logger.info('Database connection closed.');
  }
}
