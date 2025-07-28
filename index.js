require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channel = client.channels.cache.get('1397286725843288231'); // your channel ID
  if (!channel) return console.error("❌ Channel not found");

  const embed = new EmbedBuilder()
    .setColor(0xff5733)
    .setTitle("⚔️ Swordland Showdown — Alliance War Event Guide")
    .setDescription(
      "One of the biggest alliance events in Kingshot.\n**Smart teamwork = massive rewards.**\n\nChoose a section below to learn how to dominate the battlefield. 👇"
    )
    .setFooter({ text: "A.W.A - WIKI APP" });

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('button_strategy')
      .setLabel('📘 Strategy')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('button_rewards')
      .setLabel('🎁 Rewards')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('button_tips')
      .setLabel('💡 Tips')
      .setStyle(ButtonStyle.Secondary)
  );

  const message = await channel.send({
    embeds: [embed],
    components: [buttons],
  });

  await message.pin(); // Keeps message always visible
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const { customId } = interaction;

  if (customId === 'button_strategy') {
    await interaction.reply({
      content: `🧠 **Strategy Guide**\nFocus on base capturing, timing reinforcements, and use rally wisely!`,
      ephemeral: true
    });
  } else if (customId === 'button_rewards') {
    await interaction.reply({
      content: `🎁 **Rewards Overview**\nEarn gems, epic hero shards, alliance chests & more by ranking higher.`,
      ephemeral: true
    });
  } else if (customId === 'button_tips') {
    await interaction.reply({
      content: `💡 **Pro Tips**\nCoordinate attacks in voice chat and assign roles (scout, attacker, support).`,
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
