const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
  const from = ctx.update.message.from;
  console.log(from);
  ctx.reply(`Seja bem vindo, ${from.first_name}!`);
});

bot.on('text', async (ctx, next) => {
  await ctx.reply('Mid1');
  next();
});

bot.on('text', async (ctx, next) => {
  await ctx.reply('Mid2');
});

bot.startPolling(); // bot vai ficar verificando a api do bot pra ver se precisa realizar alguma ação
