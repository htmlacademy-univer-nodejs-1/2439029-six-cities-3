import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`Программа для подготовки данных для REST API сервера.
Пример: cli.js --<command> [--arguments]
По факту:  npm run ts ./src/main.cli.ts -- <command> [--arguments]\n`,
        chalk.yellow('Команды:\n'),
        chalk.green('\t--help:                      '), chalk.inverse('# выводит информации о версии приложения\n'),
        chalk.green('\t--version:                   '), chalk.inverse('# выводит информацию о списке поддерживаемых команд\n'),
        chalk.green('\t--import <path>:             '), chalk.inverse('# импортирует данные из *.tsv-файла\n'));
  }
}
