import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример: cli.js --<command> [--arguments]
        По факту:  npm run ts ./src/main.cli.ts -- <command> [--arguments]
        Команды:

            --version:                   # выводит информации о версии приложения
            --help:                      # выводит информацию о списке поддерживаемых команд
            --import <path>:             # импортирует данные из *.tsv-файла
    `);
  }
}
