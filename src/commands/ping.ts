import { SlashCommandBuilder } from '@discordjs/builders';
import { createInfoEmbed } from '../utils';

import type { CommandExecuteFuction } from '../types';

/* ---------------------------------- Meta ---------------------------------- */
export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Send a ping to the bot.');
/* -------------------------------------------------------------------------- */

/* --------------------------------- Execute -------------------------------- */
export default (async ({ client, interaction }) => {
  if (!interaction.isChatInputCommand()) return;

  interaction.reply({
    embeds: [
      createInfoEmbed()
        .setTitle('Pong!')
        .setFields([
          {
            name: 'Latency',
            value: `\`${Math.round(
              Date.now() - interaction.createdTimestamp,
            )}ms\``,
            inline: true,
          },
          {
            name: 'API Latency',
            value: `\`${Math.round(client.ws.ping)}ms\``,
            inline: true,
          },
        ]),
    ],
  });
}) as CommandExecuteFuction;
/* -------------------------------------------------------------------------- */
