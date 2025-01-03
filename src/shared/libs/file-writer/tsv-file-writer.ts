import {createWriteStream, WriteStream} from 'node:fs';
import {FileWriter} from './file-writer.interface.js';
import {CHUNK_SIZE} from "../../types/index.js";

export class TSVFileWriter implements FileWriter {
    private stream: WriteStream;

    constructor(public readonly filename: string) {
        this.stream = createWriteStream(filename, {
            flags: 'w',
            encoding: 'utf-8',
            highWaterMark: CHUNK_SIZE,
            autoClose: true,
        });
    }

    public async write(row: string): Promise<void> {
        const writeSuccess = this.stream.write(`${row}\n`);
        if (!writeSuccess) {
            return new Promise((resolve) => {
                this.stream.once('drain', () => resolve());
            });
        }

        return Promise.resolve();
    }
}
