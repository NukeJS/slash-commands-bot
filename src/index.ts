import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import Bot from './bot';

const client = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.TOKEN);
