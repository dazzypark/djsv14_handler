const { readdirSync } = require("fs");
const { Collection, Routes } = require("discord.js");
const client = require("../index");
client.commands = new Collection();
client.buttons = new Collection();
(async () => {
  if (process.env.MONGOOSE != "") {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGOOSE, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(console.log("[데이터베이스] Mongoose Connected"))
      .catch((f) =>
        console.log(`[데이터베이스] Mongoose Connect Error : ${f}`)
      );
  }
  const eventFiles = readdirSync("./Events").filter((file) =>
    file.endsWith(".js")
  );

  for (const file of eventFiles) {
    const event = require(`../Events/${file}`);
    if (event.once == true) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
    delete require.cache[require.resolve(`../Events/${file}`)];
  }

  const commnads_push_only = [];
  readdirSync("./Commands/").forEach((dirs) => {
    const commands = readdirSync(`./Commands/${dirs}`).filter((files) =>
      files.endsWith(".js")
    );
    for (const file of commands) {
      const command = require(`../Commands/${dirs}/${file}`);
      command.category = dirs;
      client.commands.set(command.data.name, command);
      commnads_push_only.push(command.data.toJSON());
      delete require.cache[require.resolve(`../Commands/${dirs}/${file}`)];
    }
  });

  const buttonFiles = readdirSync("./Buttons").filter((file) =>
    file.endsWith(".js")
  );

  for (const file of buttonFiles) {
    const button = require(`../Buttons/${file}`);
    client.buttons.set(button.name, button);
    delete require.cache[require.resolve(`../Buttons/${file}`)];
  }

  const { REST } = require("@discordjs/rest");

  const rest = new REST({ version: "10" }).setToken(
    process.env.LOGIN == 1
      ? process.env.DISCORD_TOKEN1
      : process.env.DISCORD_TOKEN2
  );

  try {
    await rest.put(
      Routes.applicationCommands(
        process.env.LOGIN == 1 ? process.env.CLIENT_ID1 : process.env.CLIENT_ID2
      ),
      {
        body: commnads_push_only,
      }
    );
  } catch (error) {
    console.error(error);
  }
})();

process.on("uncaughtException", function (err) {
  console.log(err);
});
