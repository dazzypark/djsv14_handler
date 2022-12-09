const { ChannelType, Events } = require("discord.js");
const client = require("../index");
//커맨드 파일에서...
//ephemral:true "비공개 메세지로 deferReply"
//dfr:true "deferReply 안함"

module.exports = {
  name: Events.InteractionCreate,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.channel.type == ChannelType.DM) {
      interaction.reply({
        content: `**봇의 명령어는 개인 메시지에서 사용하실 수 없습니다**`,
      });
      return;
    }
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    if (!command.dfr) {
      await interaction.deferReply({
        ephemeral: command.ephemeral == true ? true : false,
      });
    }
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(`${command.data.name}에서 오류 발생`);
      console.log(error);
    }
  },
};
