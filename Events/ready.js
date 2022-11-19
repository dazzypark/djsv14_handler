module.exports = {
  name: "ready",
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    console.log(`[준비 완료] ${client.user.tag}`);
  },
};
