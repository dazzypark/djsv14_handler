const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("핑")
    .setDescription("봇의 핑을 확인합니다"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    const msg = await interaction.fetchReply();
    await interaction.editReply({
      content: `**명령어 응답속도 : ${
        msg.createdTimestamp - interaction.createdTimestamp
      }ms | 봇 응답속도 : ${client.ws.ping}ms**`,
    });
  },
};
