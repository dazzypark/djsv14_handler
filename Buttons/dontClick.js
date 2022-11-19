let count = 0;

module.exports = {
  name: "test",
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    const customid_usercheck = interaction.customId.replace("test_", "");
    if (customid_usercheck !== interaction.member.user.id) {
      await interaction.reply({
        content: `**<@${customid_usercheck}>님만 버튼을 사용하실 수 있습니다**`,
        ephemeral: true,
      });
      return;
    }
    count++;
    await interaction.reply({
      content: `**누르지 마 ${"!".repeat(count * 2)}**`,
      ephemeral: true,
    });
  },
};
