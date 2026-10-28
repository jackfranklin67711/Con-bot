const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

const BOT_TOKEN = process.env.BOT_TOKEN || '8932500251:AAFP1N1W6t0gYHnN2X8i7qJ2p9K0v3m6L9qQ';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  await ctx.reply('🤖 CON Bot running ✅\n\nSend /help to see commands');
});

bot.help((ctx) => {
  ctx.reply('/start - Start bot\n/help - Help\n/ping - Check bot');
});

bot.command('ping', (ctx) => ctx.reply('Pong! ✅ Bot is live'));

bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  if (text.startsWith('/')) return;
  await ctx.reply(`You said: ${text}`);
});

bot.launch().then(() => {
  console.log('CON Bot running ✅');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
