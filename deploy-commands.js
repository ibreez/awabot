require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get the info panel with buttons'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // Replace 'YOUR_CLIENT_ID' with your bot's Application (Client) ID
    // Replace 'YOUR_GUILD_ID' with your test server's Guild ID for development (more instant updates)
    await rest.put(
      Routes.applicationGuildCommands('1398687914984083456', '1397286724983328828'),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
