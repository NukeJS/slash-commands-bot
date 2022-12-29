import type { Interaction } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';
import type Bot from '../bot';

export type CommandExecuteFuction = (context: {
  client: Bot;
  interaction: Interaction;
}) => Promise<void> | void;

export interface Command {
  data: SlashCommandBuilder;
  default: CommandExecuteFuction;
}
