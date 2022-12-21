const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("버튼").setDescription("버튼 테스트"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("누르지 마세요")
        .setCustomId(`test_${interaction.member.user.id}`)
        .setEmoji("🚨")
        .setStyle(ButtonStyle.Danger)
    );
    await interaction.editReply({ components: [button] });
  },
};
