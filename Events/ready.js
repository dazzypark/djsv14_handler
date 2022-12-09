const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    console.log(`[준비 완료] ${client.user.tag}`);
  },
};
