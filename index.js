process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
console.clear();

const dotenv = require("dotenv");
dotenv.config();

const { Client, Partials, GatewayIntentBits } = require("discord.js");
(module.exports = new Client({
  intents: [
    // 인텐트 수정하세요 (모든 인텐트 : 131071)
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
})).login(
  process.env.LOGIN == 1
    ? process.env.DISCORD_TOKEN1
    : process.env.DISCORD_TOKEN2
);
require("./src/loader.js");
