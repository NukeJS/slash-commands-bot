import type { Interaction } from 'discord.js';
import type Bot from '../bot';

/* --------------------------------- Execute -------------------------------- */
export default async (client: Bot, interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.default({ client, interaction });
  } catch (error) {
    client.logger.error(error);

    await interaction.reply({
      content: 'There was an error while executing this command',
      ephemeral: true,
    });
  }
};
/* -------------------------------------------------------------------------- */
