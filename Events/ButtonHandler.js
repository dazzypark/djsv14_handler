const { ChannelType, Events } = require("discord.js");
const client = require("../index");

module.exports = {
  name: Events.InteractionCreate,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (
      !interaction.isButton() &&
      !interaction.isAnySelectMenu() &&
      !interaction.isModalSubmit()
    )
      return;
    if (interaction.channel.type == ChannelType.DM) {
      interaction.reply({
        content: `**봇의 버튼은 개인 메시지에서 사용하실 수 없습니다**`,
      });
      return;
    }
    const button = client.buttons.get(interaction.customId.split("_")[0]);
    if (!button) return;
    try {
      await button.execute(interaction, client);
    } catch (error) {
      console.log(`${command.data.name}에서 오류 발생`);
      console.log(error);
    }
  },
};
