import { Client, ClientOptions, Collection, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import consola from 'consola';
import fg from 'fast-glob';

import type { Command } from './types';

class Bot extends Client {
  commands: Collection<string, Command> = new Collection();
  logger = consola.withTag('Bot');

  constructor(options: ClientOptions) {
    super(options);

    this.init();
  }

  private async init() {
    await this.loadCommands();
    await this.loadEvents();

    await this.initSlashCommands();
  }

  private async loadEvents() {
    const eventFiles = await fg(['src/events/**/*.{js,ts}'], {
      objectMode: true,
      absolute: true,
    });

    eventFiles.forEach(async (eventFile) => {
      const event = await import(eventFile.path);
      if (!event || !event?.default) return;

      const eventName = eventFile.name.split('.')[0];
      this[event.once ? 'once' : 'on'](
        eventName,
        event.default.bind(null, this),
      );
    });
  }

  private async loadCommands() {
    const commandFiles = await fg(['src/commands/**/*.{js,ts}'], {
      objectMode: true,
      absolute: true,
    });

    commandFiles.forEach(async (commandFile) => {
      const command: Command = await import(commandFile.path);
      if (!command || !command?.default) return;

      this.commands.set(command.data?.name, command);
    });
  }

  private async initSlashCommands() {
    const rest = new REST().setToken(process.env.TOKEN!);

    try {
      this.logger.info('Refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID!,
          process.env.GUILD_ID!,
        ),
        {
          body: [...this.commands].map(([, command]) => command.data.toJSON()),
        },
      );

      this.logger.success('Successfully refreshed applicaiton (/) commands.');
    } catch (error) {
      this.logger.error(error);
    }
  }
}

export default Bot;
