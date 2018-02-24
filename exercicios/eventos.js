const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
  const nome = ctx.update.message.from.first_name;
  ctx.reply(`Seja bem vindo, ${nome}`);
});

bot.on('text', ctx => {
  const texto = ctx.update.message.text;
  ctx.reply(`Texto '${texto}' recebido com sucesso`);
});

bot.on('location', ctx => {
  const localizacao = ctx.update.message.location;
  ctx.reply(`Entendido, você esta em, lat: ${localizacao.latitude} e lon: ${localizacao.longitude}`);
});

bot.on('contact', ctx => {
  const contato = ctx.update.message.contact;
  console.log(contato);
  ctx.reply(`Vou lembrar do(a) ${contato.first_name} (${contato.phone_number})`);
});

bot.on('voice', ctx => {
  const voz = ctx.update.message.voice;
  console.log(voz);
  ctx.reply(`Audio recebido, ele possui ${voz.duration} segundos`);
});

bot.on('photo', ctx => {
  const foto = ctx.update.message.photo;
  console.log(foto);
  foto.forEach((ph, i) => {
    ctx.reply(`Foto ${i} tem resolução de ${ph.width}x${ph.height}`);
  });
});

bot.on('sticker', ctx => {
  const sticker = ctx.update.message.sticker;
  console.log(sticker);
  ctx.reply(`Estou vendo que você enviou 
    o ${sticker.emoji} do conjunto ${sticker.set_name}`);
});

bot.startPolling();
