import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  REST,
  Routes,
  Events,
  SlashCommandBuilder,
  MessageFlags
} from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

// Create client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Slash command registration
const commands = [
  new SlashCommandBuilder()
    .setName('beartrap')
    .setDescription('🪤 Get the Bear Trap event guide for Kingshot.'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('📝 Registering slash command...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash command registered!');
  } catch (err) {
    console.error('❌ Failed to register command:', err);
  }
})();

// Embed and button content
const bearTrapEmbed = new EmbedBuilder()
  .setColor(0xff9900)
  .setTitle('🪤 Bear Trap Event Guide')
  .setDescription(
    '**The Bear Trap** is one of the best alliance events for farming **Forgehammers** and resources.\n\n' +
    '> 🕒 You have 30 minutes to deal as much damage as possible.\n' +
    '> 🎯 Max rewards: **1.2 Billion Damage**\n\n' +
    '**🧠 Damage Tips**\n' +
    '• **Lethality > Attack** — It gives bigger boosts!\n' +
    '• Don’t use chance-based heroes like **Jabel** when joining rallies.\n' +
    '• Only 4 hero skills from joiners are counted.\n\n' +
    '**🏹 Troop Formation:** 10% Infantry, 10% Cavalry, 80% Archers\n\n' +
    '**🛠️ Upgrade Pitfall**:\n' +
    '`Level 1 → 5%` | `Level 5 → 25%` Attack bonus.\n' +
    '> Needs 1,900 Hunting Arrows to max. 40 members = 2-day maxing.\n\n' +
    '**🏰 City Prep**:\n' +
    '• Research Lethality & Troop Capacity\n' +
    '• Upgrade Command Center & Hero Gear (Goggles/Boots)\n\n' +
    '**⚔️ Rally Hero Picks**\n' +
    '`Gen-1 (Best)`: Amadeus, Jabel, Saul\n' +
    '`Gen-2 (F2P)`: Zoe, Jabel, Quinn\n' +
    'Use **Helga** to launch if Amadeus is needed as joiner.'
  )
  .setFooter({ text: 'Kingshot Alliance Guide - Bear Trap', iconURL: 'https://cdn.discordapp.com/emojis/1223456789001234567.png' });

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('btn_mechanics')
    .setLabel('🧪 Mechanics')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('btn_pitfall')
    .setLabel('📈 Pitfall Tips')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('btn_rally')
    .setLabel('🛡️ Rally Setup')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('btn_joiner')
    .setLabel('👥 Joiner Rules')
    .setStyle(ButtonStyle.Primary)
);

// Respond to interaction
client.on(Events.InteractionCreate, async interaction => {
  const allowedChannelId = '1398236580707176458'; // Replace with your actual channel ID

  if (interaction.channelId !== allowedChannelId) {
    if (interaction.isChatInputCommand() || interaction.isButton()) {
      await interaction.reply({
        content: '🚫 This command can only be used in a specific channel.',
        flags: MessageFlags.Ephemeral
      });
    }
    return;
  }

  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'beartrap') {
      await interaction.reply({ embeds: [bearTrapEmbed], components: [row] });
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'btn_mechanics') {
      await interaction.reply({
        content:
          '**📌 Basic Damage Mechanics**\n' +
          '• **Lethality** is more effective than Attack.\n' +
          '• **Chenko**, **Amadeus**, and **Yeonwoo** boost Lethality.\n' +
          '• Chance-based skills don’t stack well — avoid them in rallies.\n' +
          '• Only 4 joiner skills are active per rally.',
        flags: MessageFlags.Ephemeral
      });
    } else if (interaction.customId === 'btn_pitfall') {
      await interaction.reply({
        content:
          '**📈 Pitfall Upgrade Tips**\n' +
          '• Max Pitfall = +25% Attack for all.\n' +
          '• Requires 1,900 Arrows — Collect via **Intel Missions**.\n' +
          '• 40 active members can max it every 2 days.',
        flags: MessageFlags.Ephemeral
      });
    } else if (interaction.customId === 'btn_rally') {
      await interaction.reply({
        content:
          '**🛡️ Best Rally Setups**\n\n' +
          '**Gen 1:** Amadeus, Jabel, Saul\n' +
          '**F2P Gen 1:** Howard, Jabel, Quinn\n' +
          '**Gen 2:** Amadeus, Hilde, Marlin\n' +
          '**F2P Gen 2:** Zoe, Jabel, Quinn\n\n' +
          '> Use Helga to launch if Amadeus is needed for joining.',
        flags: MessageFlags.Ephemeral
      });
    } else if (interaction.customId === 'btn_joiner') {
      await interaction.reply({
        content:
          '**👥 Rally Joiner Rules**\n' +
          '• Max 4 joiner hero skills active.\n' +
          '• Send **Chenko**, **Yeonwoo**, or **Amadeus** with maxed skills first.\n' +
          '• If 4 are already present, don’t send more — just send troops.\n' +
          '• Use yellow flag on rally page to verify active skills.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
});

// Bot ready
client.once(Events.ClientReady, () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// Login
client.login(process.env.DISCORD_TOKEN);
echo .env >> .gitignore
