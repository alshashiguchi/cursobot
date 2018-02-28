const env = require('../../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const bot = new Telegraf(env.token);

const gerarBotoes = lista => Extra.markup(
  Markup.inlineKeyboard(
    lista.map(item => Markup.callbackButton(`delete ${item}`)),
    {columns: 3}
  )
);

bot.use(session());

bot.start(async ctx => {
  const name = ctx.update.message.from.first_name;
  await ctx.reply(`Seja bem vindo, ${name}`);
  await ctx.reply(`Escreva os itens que você deseja adicionar...`);
  ctx.session.lista = [];
});

bot.on('text', ctx => {
  ctx.session.lista.push(ctx.update.message.text);
  ctx.reply(`${ctx.update.message.text} adicionado!`, gerarBotoes(ctx.session.lista));
});

bot.action(/delete (.+)/, ctx => {
  ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1]);
  ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes(ctx.session.lista));
});

bot.startPolling();
